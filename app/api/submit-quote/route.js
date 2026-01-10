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
    console.log('📝 Submit Quote API called');
    
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
    const validation = validateQuoteRequest(body);
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
    const quoteData = {
      Name: body.name?.trim() || '',
      Email: body.email?.toLowerCase().trim() || '',
      Company: body.company?.trim() || '',
      Website: body.website?.trim() || '',
      ProjectType: body.projectType || '',
      Budget: body.budget || '',
      Timeline: body.timeline || '',
      Description: body.description?.trim() || '',
      Status: 'New',
      Source: 'Quote Modal',
      Notes: `Submitted via Quote Modal on ${new Date().toLocaleDateString('tr-TR')}`,
      Priority: getPriority(body.budget)
    };

    console.log('📊 Prepared Quote Data (sanitized):', {
      ...quoteData,
      Description: quoteData.Description.length > 50 
        ? quoteData.Description.substring(0, 50) + '...' 
        : quoteData.Description
    });

    // Save to Airtable
    let result;
    try {
      result = await airtableService.createRecord('Quotes', quoteData);
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
      message: 'Quote request submitted successfully',
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
        message: 'Your quote request has been received. We\'ll contact you within 24 hours.'
      },
      submittedAt: new Date().toISOString(),
      referenceId: `QUOTE_${Date.now()}`
    };

    // Log
    console.log('🎉 Quote submission completed:', {
      email: body.email,
      referenceId: response.referenceId,
      isReal: response.data.isReal
    });

    return NextResponse.json(response, {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('💥 Unexpected error in submit-quote:', error);

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
 * Request validation
 */
function validateQuoteRequest(data) {
  const errors = [];
  
  if (!data.name?.trim()) {
    errors.push('Name is required');
  }
  
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.projectType) {
    errors.push('Project type is required');
  }
  
  if (!data.description?.trim()) {
    errors.push('Description is required');
  } else if (data.description.trim().length < 20) {
    errors.push('Description must be at least 20 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Bütçeye göre öncelik belirle
 */
function getPriority(budget) {
  const budgetMap = {
    '100-500': 'Low',
    '500-1000': 'Medium',
    '1000-2000': 'High',
    '2000-4000': 'Very High'
  };
  
  return budgetMap[budget] || 'Medium';
}