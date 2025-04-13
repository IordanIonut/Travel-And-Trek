interface Icon {
  name: string;
  type: string;
}

export const iconsObject: Record<string, Icon> = {
  HOME: { name: 'home', type: 'home' },
  ALL: { name: 'apps', type: 'apps' },
  LIKE: { name: 'thumb_up', type: 'thumb_up' },
  FAVORITE: { name: 'favorite', type: 'favorite' },
  FUNNY: { name: 'mood', type: 'mood' },
  SEARCH: { name: 'search', type: 'search' },
  NOTIFICATIONS: { name: 'notifications', type: 'notifications' },
  CHAT: { name: 'chat', type: 'chat' },
  COMMENT: { name: 'comment', type: 'comment' },
  SHARE: { name: 'share', type: 'share' },
  MORE_VENT: { name: 'more_vert', type: 'more_vert' },
  NEWSPAPER: { name: 'newspaper', type: 'newspaper' },
  PLAY_CIRCLE: { name: 'play_circle', type: 'play_circle' },
  DESCRIPTION: { name: 'description', type: 'description' },
  REPLY_ALL: { name: 'reply_all', type: 'reply_all' },
  SELL: { name: 'sell', type: 'sell' },
  BLOCK: { name: 'block', type: 'block' },
  PHOTO_CAMERA: { name: 'photo_camera', type: 'photo_camera' },
  PERSON: { name: 'person', type: 'person' },
  PERSON_SEARCH: { name: 'person_search', type: 'person_search' },
  SEND: { name: 'send', type: 'send' },
};
