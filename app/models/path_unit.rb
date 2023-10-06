# frozen_string_literal: true

class PathUnit < ApplicationRecord
  belongs_to :path
  has_many :path_unit_reports, dependent: :destroy
end
