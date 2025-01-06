```mermaid


erDiagram
    USERS {
        int id PK
        varchar email
        varchar encrypted_password
        varchar reset_password_token
        datetime reset_password_sent_at
        datetime remember_created_at
        datetime created_at
        datetime updated_at
        varchar jti
        varchar name
        varchar role
    }

    CONTACTS {
        int id PK
        int user_id FK
        varchar name
        varchar email
        varchar phone
        text message
        datetime created_at
        datetime updated_at
    }

    DONATIONS {
        int id PK
        decimal amount
        int user_id FK
        varchar payment_status
        boolean save_payment_info
        varchar payment_token
        boolean canceled
        datetime created_at
        datetime updated_at
    }

    KITS {
        int id PK
        varchar name
        text description
        varchar grade_level
        datetime created_at
        datetime updated_at
    }

    KIT_ITEMS {
        int id PK
        varchar name
        text description
        datetime created_at
        datetime updated_at
    }

    KIT_ITEMS_KITS {
        int kit_id FK
        int kit_item_id FK
    }

    ORDERS {
        int id PK
        int address_id FK
        int kit_id FK
        int user_id FK
        varchar school_year
        varchar phone
        text comments
        datetime created_at
        datetime updated_at
    }

    ACTIVE_STORAGE_ATTACHMENTS {
        int id PK
        varchar name
        varchar record_type
        int record_id
        int blob_id FK
        datetime created_at
    }

    ACTIVE_STORAGE_BLOBS {
        int id PK
        varchar key
        varchar filename
        varchar content_type
        text metadata
        varchar service_name
        int byte_size
        varchar checksum
        datetime created_at
    }

    ACTIVE_STORAGE_VARIANT_RECORDS {
        int id PK
        int blob_id FK
        varchar variation_digest
    }

    USERS ||--o{ CONTACTS : "has many"
    USERS ||--o{ DONATIONS : "has many"
    USERS ||--o{ ORDERS : "submits"
    KITS ||--o{ KIT_ITEMS_KITS : "contains"
    KIT_ITEMS ||--o{ KIT_ITEMS_KITS : "is contained in"
    KITS ||--o{ ORDERS : "is requested by"
    ACTIVE_STORAGE_BLOBS ||--o{ ACTIVE_STORAGE_ATTACHMENTS : "is attached to"
    ACTIVE_STORAGE_BLOBS ||--o{ ACTIVE_STORAGE_VARIANT_RECORDS : "has variants"

```
