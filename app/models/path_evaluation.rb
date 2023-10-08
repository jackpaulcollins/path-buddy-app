# frozen_string_literal: true

class PathEvaluation < ApplicationRecord
  enum :status, %w[incomplete pass fail]
  belongs_to :path

  validates :status, presence: true
  validates_uniqueness_of :date, scope: :path_id

  def toggle_status!
    pass? ? fail! : pass!
  end
end
