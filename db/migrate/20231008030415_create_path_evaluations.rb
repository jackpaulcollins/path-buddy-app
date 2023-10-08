class CreatePathEvaluations < ActiveRecord::Migration[7.0]
  def change
    create_table :path_evaluations do |t|
      t.date :date, null: false
      t.references :path, null: false, foreign_key: true
      t.integer :status, default: 0

      t.timestamps
    end

    add_index :path_evaluations, [:path_id, :date], unique: true
  end
end
