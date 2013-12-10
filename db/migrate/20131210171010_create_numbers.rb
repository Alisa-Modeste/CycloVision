class CreateNumbers < ActiveRecord::Migration
  def change
    create_table :numbers do |t|
      t.integer :number, null: false

      t.timestamps
    end
  end
end
