class AddIndexes < ActiveRecord::Migration
  def up
  	execute "CREATE INDEX idx_number_created_min ON numbers(date_trunc('min', created_at))"
  	execute "CREATE INDEX idx_number_created_hour ON numbers(date_trunc('hour', created_at))"
  	execute "CREATE INDEX idx_number_created_day ON numbers(date_trunc('day', created_at))"
  	execute "CREATE INDEX idx_number_created_month ON numbers(date_trunc('month', created_at))"
  	execute "CREATE INDEX idx_number_created_year ON numbers(date_trunc('year', created_at))"
  end

  def down
  	execute "DROP INDEX idx_number_created_min ON numbers(date_trunc('min', created_at))"
  	execute "DROP INDEX idx_number_created_hour ON numbers(date_trunc('hour', created_at))"
  	execute "DROP INDEX idx_number_created_day ON numbers(date_trunc('day', created_at))"
  	execute "DROP INDEX idx_number_created_month ON numbers(date_trunc('month', created_at))"
  	execute "DROP INDEX idx_number_created_year ON numbers(date_trunc('year', created_at))"
  end
end
