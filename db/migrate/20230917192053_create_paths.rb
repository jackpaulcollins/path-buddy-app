class CreatePaths < ActiveRecord::Migration[7.0]
  def change
    create_table :paths do |t|
      t.string :name, null: false
      t.string :state, null: false
      t.references :user, null: false, foreign_key: true
      t.date :start_date, null: false
      t.date :end_date, null: true
      t.text :why, null: true

      t.timestamps
    end

    add_index :paths, [:user_id, :state], unique: true, where: "state = 'active'"
  end
end
