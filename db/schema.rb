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

ActiveRecord::Schema[7.0].define(version: 2023_10_08_030415) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "status", ["pass", "fail"]

  create_table "path_evaluations", force: :cascade do |t|
    t.date "date", null: false
    t.bigint "path_id", null: false
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["path_id", "date"], name: "index_path_evaluations_on_path_id_and_date", unique: true
    t.index ["path_id"], name: "index_path_evaluations_on_path_id"
  end

  create_table "path_unit_reports", force: :cascade do |t|
    t.bigint "path_unit_id", null: false
    t.date "date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.index ["path_unit_id", "date"], name: "index_path_unit_reports_on_path_unit_id_and_date", unique: true
    t.index ["path_unit_id"], name: "index_path_unit_reports_on_path_unit_id"
  end

  create_table "path_units", force: :cascade do |t|
    t.bigint "path_id", null: false
    t.string "name"
    t.string "polarity"
    t.string "schedule"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["path_id"], name: "index_path_units_on_path_id"
  end

  create_table "paths", force: :cascade do |t|
    t.string "name", null: false
    t.string "state", null: false
    t.bigint "user_id", null: false
    t.date "start_date", null: false
    t.date "end_date"
    t.text "why"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "state"], name: "index_paths_on_user_id_and_state", unique: true, where: "((state)::text = 'active'::text)"
    t.index ["user_id"], name: "index_paths_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "password_digest", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string "jti", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "time_zone"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "path_evaluations", "paths"
  add_foreign_key "path_unit_reports", "path_units"
  add_foreign_key "path_units", "paths"
  add_foreign_key "paths", "users"
end
