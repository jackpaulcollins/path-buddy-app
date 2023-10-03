# frozen_string_literal: true

class PathUnitReport < ApplicationRecord
  belongs_to :path_unit

  validates_presence_of :status
  validates_uniqueness_of :date, scope: :path_unit_id
end
