class PathUnitReport < ApplicationRecord
  belongs_to :path_unit

  validates_uniqueness_of :date, scope: :path_unit_id
end
