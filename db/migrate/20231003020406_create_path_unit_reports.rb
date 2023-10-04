class CreatePathUnitReports < ActiveRecord::Migration[7.0]
  def change
    create_table :path_unit_reports do |t|
      t.references :path_unit, null: false, foreign_key: true
      t.string :status, null: false
      t.date :date, null: false

      t.timestamps
    end

    add_index :path_unit_reports, [:path_unit_id, :date], unique: true
  end
end
