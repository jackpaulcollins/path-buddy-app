class CreatePathUnits < ActiveRecord::Migration[7.0]
  def change
    create_table :path_units do |t|
      t.references :path, null: false, foreign_key: true
      t.string :name
      t.string :polarity
      t.string :schedule

      t.timestamps
    end
  end
end
