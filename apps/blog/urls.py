from django.urls import path
from .views import *

urlpatterns = [
    path("posts/create", create_post, name="create_post"),
    path("posts", all_post, name="all_post"),
    path("posts/<str:slug>", post_detail, name="post_detail"),
    path("posts/<uuid:id>/edit", post_data, name="post_data"),
    path("posts/editor/all", editor_posts, name="editor_posts"),
    path("posts/<uuid:id>/update", update_post, name="update_post"),
    path("posts/<uuid:id>/delete", delete_post, name="delete_post"),
    path("posts/<uuid:id>/patch", patch_post, name="patch_post"),
    path("tags", all_tags, name="all_tags"),
    path("tags/search", search_tags, name="search_tags"),
    path("tags/<str:name>", tag_detail, name="tag_detail"),
    path("comments/<uuid:id>/update", update_comment, name="update_comment"),
    path("comments/<uuid:id>/delete", delete_comment, name="delete_comment"),
    path("comments", comment_post, name="comment_post"),
    path("comments/<uuid:post_id>", comments_post, name="comments_post"),
    path("comments/<uuid:comment_id>/replies", comment_replies, name="comment_replies"),
    path("reactions/post/<uuid:post_id>", reactions_post, name="reactions_post"),
    path("reaction/user/<uuid:post_id>", user_reaction, name="user_reaction"),
    path("reaction-list/post/<uuid:post_id>", reaction_list, name="reaction_list"),
    path("react/post", react_post, name="react_post"),
    path(
        "posts/<uuid:post_id>/remove-image", delete_image_post, name="delete_image_post"
    ),
    path(
        "tags/<uuid:post_id>/remove-image", delete_image_post, name="delete_image_post"
    ),
    path("upload-image", upload_image, name="upload_image"),
    path("remove-image/<str:file_id>", remove_image, name="remove_image"),
    path(
        "bulk_delete_images",
        bulk_delete_images,
        name="bulk_delete_images",
    ),
]
