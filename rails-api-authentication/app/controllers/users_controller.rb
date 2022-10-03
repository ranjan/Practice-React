class UsersController < ApplicationController
  
  def index
    render json:  User.all.to_json      
  end

  def show
    render json:  User.find(params[:id]).to_json      
  end

  def destroy
    @user = User.find(params[:id])
    @user.delete
    render json: {}      
  end

  def update
    @user = User.find(params[:id])
    @user.update(
      name: params['user']['name'],
      email: params['user']['email'],
    )

    if @post
      render json:  @post.to_json
    else
      render json: { status: 500 }
    end
  end

end
