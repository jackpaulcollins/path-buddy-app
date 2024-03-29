# frozen_string_literal: true

# {"iss"=>"https://accounts.google.com",
#   "azp"=>"783783941258-m7cc9mb9rodak6hmsmlnv7kr0471tn5v.apps.googleusercontent.com",
#   "aud"=>"783783941258-m7cc9mb9rodak6hmsmlnv7kr0471tn5v.apps.googleusercontent.com",
#   "sub"=>"101276664353623463040",
#   "email"=>"jackpaulcollins@gmail.com",
#   "email_verified"=>true, "nbf"=>1693425303,
#    "name"=>"Jack Collins",
#    "picture"=>"https://lh3.googleusercontent.com/a/AAcHTtehVuaDEwjfKwE4EpClltgUv-Ay9TSzEFakXAERgRLX3Q=s96-c",
#    "given_name"=>"Jack", "family_name"=>"Collins", "locale"=>"en", "iat"=>1693425603, "exp"=>1693429203,

module Users
  class RegisterFromOauthOp < BaseOp
    string :email
    string :name

    validates :email, presence: true
    validates :name, presence: true

    outputs :user

    protected

    def perform
      pw = SecureRandom.hex(8)
      user = create_user!(pw)

      output :user, user
    end

    def create_user!(password)
      ::Users::UserRegistrationOp.submit!(
        email: email,
        first_name: name.split[0],
        last_name: name.split[1],
        password: password,
        password_confirmation: password,
        time_zone: System::TIME_ZONES[0]
      ).user
    end
  end
end
