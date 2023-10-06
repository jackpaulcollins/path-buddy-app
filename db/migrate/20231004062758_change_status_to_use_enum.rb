class ChangeStatusToUseEnum < ActiveRecord::Migration[6.0]
  def up
    add_column :path_unit_reports, :new_status, :integer, default: 0

    execute <<-SQL
      UPDATE path_unit_reports
      SET new_status = CASE
                       WHEN status = 'unanswered' THEN 0
                       WHEN status = 'pass' THEN 1
                       WHEN status = 'fail' THEN 2
                       END;
    SQL

    remove_column :path_unit_reports, :status

    rename_column :path_unit_reports, :new_status, :status
  end

  def down
    rename_column :path_unit_reports, :status, :new_status
    add_column :path_unit_reports, :status, :string
    execute <<-SQL
      UPDATE path_unit_reports
      SET status = CASE
                  WHEN new_status = 0 THEN 'unanswered'
                  WHEN new_status = 1 THEN 'pass'
                  WHEN new_status = 2 THEN 'fail'
                  END;
    SQL
    remove_column :path_unit_reports, :new_status
  end
end
