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
      keep_going = true
      today = Time.current.in_time_zone(user.time_zone).to_date
      return 0 if path.failed_for_date?(today)

      # don't break a streak just becase today hasn't been marked complete yet
      completed_today = path.valid_for_date?(today)
      start_date = completed_today ? today : today - 1.day

      streak = 0

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
