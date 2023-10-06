# frozen_string_literal: true

class PathUnitReport < ApplicationRecord
  enum :status, %w[unanswered pass fail], default: 'unanswered'
  belongs_to :path_unit

  validates :status, presence: true
  validates_uniqueness_of :date, scope: :path_unit_id
end
