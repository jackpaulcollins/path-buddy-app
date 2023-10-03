# frozen_string_literal: true

class Path < ApplicationRecord
  belongs_to :user
  has_many :path_units, dependent: :destroy

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
end