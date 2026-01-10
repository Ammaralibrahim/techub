import { NextResponse } from 'next/server';
import { airtableService } from '@/lib/airtable';

export const dynamic = 'force-dynamic';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
  try {
    console.log('📝 Submit Contact API called');
    
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
          details: error.message
        },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    // Validation
    const validation = validateContactRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.errors
        },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    // SADECE Airtable'da tanımlı alanları hazırla
    const contactData = {
      Name: body.name?.trim() || '',
      Email: body.email?.toLowerCase().trim() || '',
      Company: body.company?.trim() || '',
      Budget: body.budget || 'Not specified',
      Message: body.message?.trim() || '',
      Status: 'New Inquiry',
      Source: 'Contact Page',
      ProjectType: 'General Inquiry'
    };

    console.log('📊 Prepared Contact Data (sanitized):', {
      ...contactData,
      Message: contactData.Message.length > 50 
        ? contactData.Message.substring(0, 50) + '...' 
        : contactData.Message
    });

    // Save to Airtable
    let result;
    try {
      result = await airtableService.createRecord('Contacts', contactData);
      console.log('✅ Airtable create result:', {
        success: result.success,
        isReal: result._isReal,
        isMock: result._isMock
      });
    } catch (airtableError) {
      console.error('❌ Airtable save error:', airtableError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save to Airtable',
          details: airtableError.message,
          fallback: true
        },
        { 
          status: 500,
          headers: corsHeaders
        }
      );
    }

    // Success response
    const response = {
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: result.id,
        recordId: result.data?.id,
        timestamp: result.timestamp,
        isReal: result._isReal || false,
        isMock: result._isMock || false
      },
      notification: {
        show: true,
        type: 'success',
        message: 'Thank you for your message. We\'ll get back to you within 24 hours.'
      },
      submittedAt: new Date().toISOString(),
      referenceId: `CONTACT_${Date.now()}`
    };

    // Log
    console.log('🎉 Contact submission completed:', {
      email: body.email,
      referenceId: response.referenceId,
      isReal: response.data.isReal
    });

    return NextResponse.json(response, {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('💥 Unexpected error in submit-contact:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

/**
 * Validate contact request
 */
function validateContactRequest(data) {
  const errors = [];
  
  if (!data.name?.trim()) {
    errors.push('Name is required');
  }
  
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.message?.trim()) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}