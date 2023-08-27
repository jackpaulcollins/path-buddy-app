# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email,              null: false, default: ""
      t.string :password_digest, null: false

      t.string   :reset_password_token
      t.datetime :reset_password_sent_at


      t.string :jti, null: false
      t.string :first_name
      t.string :last_name
      t.string :time_zone
      t.boolean :admin

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :jti,                  unique: true
    add_index :users, :reset_password_token, unique: true
  end
end
