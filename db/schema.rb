# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_01_11_165839) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "street_address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "postal_code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "addressable_type", null: false
    t.integer "addressable_id", null: false
    t.boolean "save_to_user"
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "availabilities", force: :cascade do |t|
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.integer "speaker_id", null: false
    t.integer "recurring_availability_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recurring_availability_id"], name: "index_availabilities_on_recurring_availability_id"
    t.index ["speaker_id"], name: "index_availabilities_on_speaker_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.integer "event_id", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "availability_id"
    t.index ["availability_id"], name: "index_bookings_on_availability_id"
    t.index ["event_id"], name: "index_bookings_on_event_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "email"
    t.string "phone"
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "donations", force: :cascade do |t|
    t.decimal "amount"
    t.integer "user_id", null: false
    t.string "payment_status"
    t.boolean "save_payment_info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "payment_token"
    t.boolean "canceled", default: false
    t.index ["user_id"], name: "index_donations_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.integer "speaker_id", null: false
    t.string "title", null: false
    t.string "description"
    t.integer "duration", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["speaker_id"], name: "index_events_on_speaker_id"
  end

  create_table "kit_items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "kit_items_kits", id: false, force: :cascade do |t|
    t.integer "kit_id", null: false
    t.integer "kit_item_id", null: false
  end

  create_table "kits", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "grade_level"
  end

  create_table "orders", force: :cascade do |t|
    t.string "school_year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone"
    t.text "comments"
    t.integer "user_id"
    t.integer "address_id"
    t.string "product_type"
    t.integer "product_id"
    t.index ["product_type", "product_id"], name: "index_orders_on_product"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name", null: false
    t.integer "org_type", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recurring_availabilities", force: :cascade do |t|
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.string "role"
    t.string "first_name"
    t.string "last_name"
    t.text "bio"
    t.integer "organization_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["organization_id"], name: "index_users_on_organization_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "availabilities", "recurring_availabilities"
  add_foreign_key "availabilities", "users", column: "speaker_id"
  add_foreign_key "bookings", "availabilities"
  add_foreign_key "bookings", "events"
  add_foreign_key "contacts", "users"
  add_foreign_key "donations", "users"
  add_foreign_key "events", "users", column: "speaker_id"
  add_foreign_key "orders", "addresses"
  add_foreign_key "orders", "users"
  add_foreign_key "users", "organizations"
end
