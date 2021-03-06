# frozen_string_literal: true

class MakePasswordDigestNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :users, :password_digest, true
  end
end
