class PostsController < ApplicationController

  def create
    post = Post.create!(
      title: params['post']['title'],
      datetime: params['post']['datetime'],
      body: params['post']['body']
    )

    if post
      render json: post.to_json
    else
      render json: { status: 500 }
    end
  end

  def index
    render json:  Post.all.to_json      
  end

  def show
    render json:  Post.find(params[:id]).to_json      
  end

  def destroy
    @post = Post.find(params[:id])
    @post.delete
    render json: {}      
  end


  def update
    @post = Post.find(params[:id])
    @post.update(
      title: params['post']['title'],
      datetime: params['post']['datetime'],
      body: params['post']['body']
    )

    if @post
      render json:  @post.to_json
    else
      render json: { status: 500 }
    end
  end



end
