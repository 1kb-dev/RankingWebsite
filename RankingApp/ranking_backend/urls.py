from django.urls import path
from . import views

urlpatterns = [
    path('ranking', views.get_ranking, name='get_ranking'),
    path('join', views.join_game, name='join_game'),
    path('online', views.get_online_players, name='get_online_players'),
    path('matches', views.get_last_10_matches, name='get_last_10_matches'),
    path('fight', views.fight, name='fight'),
    path('test', views.this_is_a_test, name='this_is_a_test'),
]
