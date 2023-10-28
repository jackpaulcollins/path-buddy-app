# frozen_string_literal: true

require 'subroutine/association_fields'

module Paths
  class CurrentStreakOp < BaseOp
    include ::Subroutine::AssociationFields
    association :path
    association :user
    date :date
    outputs :streak

    protected

    def perform
      output :streak, current_streak
    end

    def current_streak
      streak = 0
      keep_going = true
      start_date = Time.current.in_time_zone(user.time_zone).to_date - 1.day

      while keep_going
        if path.valid_for_date?(start_date)
          streak += 1
          start_date -= 1.day
        else
          keep_going = false
        end
      end

      streak
    end
  end
end
