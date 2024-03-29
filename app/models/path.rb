# frozen_string_literal: true

class Path < ApplicationRecord
  belongs_to :user
  has_many :path_units, dependent: :destroy
  has_many :path_evaluations, dependent: :destroy

  validates :name, presence: true
  validates :state, presence: true
  validates :user, presence: true
  validates :start_date, presence: true

  validate :unique_active_path_per_user, on: :create

  after_create :maybe_activate

  state_machine :initial => :draft do
    event :activate do
      transition draft: :active
    end
  end

  def maybe_activate
    activate if in_active_range?
  end

  def unique_active_path_per_user
    return unless active? && user_active_path_present?

    errors.add(:state, 'You can have only one active path at a time')
  end

  def user_active_path_present?
    Path.where(user_id: user_id, state: 'active').exists?
  end

  def in_active_range?
    start_date <= Date.today && (end_date.nil? || end_date >= Date.today)
  end

  def valid_for_date?(date)
    path_units
      .where
      .not(id: PathUnitReport.where(date: date, status: 'pass').pluck(:path_unit_id))
      .empty?
  end

  def failed_for_date?(date)
    path_units
      .where(id: PathUnitReport.where(date: date, status: 'fail').pluck(:path_unit_id))
      .any?
  end

  def all_units_answered_for_date?(date)
    reported_units_count = path_units
                           .joins(:path_unit_reports)
                           .where(path_unit_reports: { date: date, status: %w[pass fail] })
                           .count
    reported_units_count == path_units.count
  end
end
