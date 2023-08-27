# frozen_string_literal: true

module System
  JWT_TOKEN_EXPIRY_TIME = Time.now.to_i + 4 * 3600

  TIME_ZONES = [
    'Pacific Time (US & Canada)',
    'Mountain Time (US & Canada)',
    'Central Time (US & Canada)',
    'Eastern Time (US & Canada)',
    'UTC',
    'London',
    'Berlin',
    'Tokyo',
    'Sydney'
  ].freeze
end
