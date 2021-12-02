def has_access(user, post):
    match user:
        case {"admin": True}:
            return True

        case {"id": user_id} if post["author_id"] == user_id:
            return True

        case _:
            return False

admin = { "name": "a", "admin": True, "id": 1 }
user1 = { "name": "b", "id": 2 }
user2 = { "name": "c", "id": 3 }

post = { "title": "Python Pattern Match", "id": 1, "author_id": user1["id"] }

print(has_access(admin, post))
print(has_access(user1, post))
print(has_access(user2, post))
