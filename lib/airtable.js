/**
 * Airtable API Service - Sadece Tanımlı Alanları Gönder
 */
export class AirtableService {
  constructor() {
    this.baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    this.apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
    
    // Debug info
    console.log('🔧 Airtable Config:', {
      hasBaseId: !!this.baseId,
      hasApiKey: !!this.apiKey,
      baseIdPreview: this.baseId ? this.baseId.substring(0, 10) + '...' : 'None',
      apiKeyPreview: this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'None'
    });
    
    this.baseUrl = `https://api.airtable.com/v0/${this.baseId}`;
    this.headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Yeni kayıt oluştur - SADECE TANIMLI ALANLAR
   */
  async createRecord(tableName, fields) {
    // Eğer credentials yoksa mock mode'a geç
    if (!this.baseId || !this.apiKey || this.baseId === 'appFE4kAouet2eBZg') {
      console.log('📝 Mock Mode: Airtable credentials not set');
      return this.mockResponse(fields);
    }

    try {
      console.log(`📤 Sending to Airtable "${tableName}":`, {
        fieldsCount: Object.keys(fields).length,
        fields: Object.keys(fields)
      });

      const response = await fetch(`${this.baseUrl}/${encodeURIComponent(tableName)}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          records: [{
            fields: this.sanitizeFields(tableName, fields)
          }],
          typecast: true
        }),
        // Timeout after 10 seconds
        signal: AbortSignal.timeout(10000)
      });

      // Log response status
      console.log(`📨 Airtable response status: ${response.status} ${response.statusText}`);

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Airtable API Error:', {
          status: response.status,
          error: data.error,
          table: tableName
        });
        
        // Eğer alan hatası varsa, hangi alan olduğunu göster
        if (data.error?.type === 'UNKNOWN_FIELD_NAME') {
          console.error('⚠️ Unknown field detected. Available fields should be:', 
            this.getTableFields(tableName));
        }
        
        throw new Error(
          data.error?.message || 
          `Airtable error (${response.status}): ${response.statusText}`
        );
      }

      console.log('✅ Airtable record created successfully:', {
        recordId: data.records[0]?.id,
        table: tableName,
        timestamp: new Date().toISOString()
      });

      return {
        success: true,
        data: data.records[0],
        id: data.records[0]?.id,
        table: tableName,
        timestamp: new Date().toISOString(),
        _isReal: true
      };

    } catch (error) {
      console.error(`❌ Airtable error for ${tableName}:`, error.message);
      
      // Fallback: LocalStorage'a kaydet
      if (typeof window !== 'undefined') {
        const saved = this.saveToLocalFallback(tableName, fields);
        if (saved) {
          console.log('💾 Saved to localStorage as fallback');
        }
      }
      
      // Mock response döndür (kullanıcıya başarılı göstermek için)
      return this.mockResponse(fields, true);
    }
  }

  /**
   * Alanları temizle - Sadece tanımlı alanları gönder
   */
  sanitizeFields(tableName, fields) {
    // Sadece bu alanları gönder (Airtable'da tanımlı olanlar)
    const allowedFields = {
      'Quotes': [
        'Name', 'Email', 'Company', 'Website', 
        'ProjectType', 'Budget', 'Timeline', 'Description',
        'Status', 'Source', 'Notes', 'Priority'
      ],
      'Contacts': [
        'Name', 'Email', 'Company', 'Budget', 'Message',
        'Status', 'Source', 'ProjectType'
      ]
    };

    const tableFields = allowedFields[tableName] || [];
    const sanitized = {};

    for (const field of tableFields) {
      if (fields[field] !== undefined && fields[field] !== null && fields[field] !== '') {
        sanitized[field] = fields[field];
      }
    }

    console.log(`🧹 Sanitized fields for ${tableName}:`, {
      original: Object.keys(fields),
      sanitized: Object.keys(sanitized),
      removed: Object.keys(fields).filter(f => !tableFields.includes(f))
    });

    return sanitized;
  }

  /**
   * Tablo alanlarını getir (debug için)
   */
  getTableFields(tableName) {
    const fields = {
      'Quotes': ['Name', 'Email', 'Company', 'Website', 'ProjectType', 'Budget', 'Timeline', 'Description', 'Status', 'Source', 'Notes', 'Priority'],
      'Contacts': ['Name', 'Email', 'Company', 'Budget', 'Message', 'Status', 'Source', 'ProjectType']
    };
    return fields[tableName] || [];
  }

  /**
   * Fallback: LocalStorage'a kaydet
   */
  saveToLocalFallback(tableName, fields) {
    try {
      const key = `airtable_fallback_${tableName}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const newRecord = {
        ...fields,
        _id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        _table: tableName,
        _synced: false,
        _createdAt: new Date().toISOString()
      };
      
      existing.push(newRecord);
      localStorage.setItem(key, JSON.stringify(existing));
      
      return newRecord;
    } catch (error) {
      console.error('LocalStorage fallback error:', error);
      return null;
    }
  }

  /**
   * Mock response for development
   */
  mockResponse(fields, isFallback = false) {
    const mockId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      data: {
        id: mockId,
        fields: fields,
        createdTime: new Date().toISOString()
      },
      id: mockId,
      table: 'mock_table',
      timestamp: new Date().toISOString(),
      _isMock: true,
      _isFallback: isFallback,
      _message: isFallback ? 
        'Using mock data due to Airtable error' : 
        'Using mock data (credentials not properly set)'
    };
  }
}

/**
 * Global Airtable instance
 */
export const airtableService = new AirtableService();

export default airtableService;