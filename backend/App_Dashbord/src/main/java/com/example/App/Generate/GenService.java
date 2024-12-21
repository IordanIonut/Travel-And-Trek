package com.example.App.Generate;

import com.example.App.Dashbord.Embedded.*;
import com.example.App.Dashbord.Enum.*;
import com.example.App.Dashbord.Model.*;
import com.example.App.Dashbord.Repository.*;
import com.example.App.Dashbord.Service.FollowerService;
import com.example.App.Journal.Model.Hobby;
import com.example.App.Journal.Model.Journal;
import com.example.App.Journal.Model.TravelDestination;
import com.example.App.Journal.Repository.HobbyRepository;
import com.example.App.Journal.Repository.JournalRepository;
import com.example.App.Journal.Repository.TravelDestionationRepository;
import com.example.App.Messenger.Embedded.GroupMembershipId;
import com.example.App.Messenger.Embedded.MessagesId;
import com.example.App.Messenger.Enum.MessageEnum;
import com.example.App.Messenger.Enum.Role;
import com.example.App.Messenger.Model.Group;
import com.example.App.Messenger.Model.GroupMembership;
import com.example.App.Messenger.Model.Message;
import com.example.App.Messenger.Model.MessageReadStatus;
import com.example.App.Messenger.Repository.GroupMembershipRepository;
import com.example.App.Messenger.Repository.GroupRepository;
import com.example.App.Messenger.Repository.MessageReadStatusRepository;
import com.example.App.Messenger.Repository.MessageRepository;
import com.github.javafaker.Faker;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GenService {
    @Autowired
    private LocationMediaSearch locationMediaSearch;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private ShareRepository shareRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private FollowerRepository followerRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private HighlightRepository highlightRepository;
    @Autowired
    private HashtagRepository hashtagRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private GroupMembershipRepository groupMembershipRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private MessageReadStatusRepository messageReadStatusRepository;
    @Autowired
    private HobbyRepository hobbyRepository;
    @Autowired
    private TravelDestionationRepository travelDestionationRepository;
    @Autowired
    private JournalRepository journalRepository;

    private static final Faker faker = new Faker();
    private static final Random random = new Random();
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(FollowerService.class);

    public Optional<Map<String, Object>> getGeoCode() {
        double[] coordinates = GenLatLot.generateRandomLandCoordinates();
        double latitude = coordinates[0];
        double longitude = coordinates[1];

        JsonObject geoData = locationMediaSearch.geocode(latitude, longitude);

        if (geoData != null && geoData.get("results").isJsonArray()) {
            JsonArray resultsArray = geoData.getAsJsonArray("results");
            if (resultsArray.size() > 0) {
                JsonObject firstResult = resultsArray.get(0).getAsJsonObject();
                Map<String, Object> map = new Gson().fromJson(firstResult, new TypeToken<Map<String, Object>>() {
                }.getType());
                return Optional.of(map);
            }
        } else {
            LOG.warn("getGeoCode() - No results found in geocode data or geoData is null.");
        }
        return Optional.empty();
    }

    public Optional<String> getGeoCodeFormatted() {
        double[] coordinates = GenLatLot.generateRandomLandCoordinates();
        double latitude = coordinates[0];
        double longitude = coordinates[1];

        JsonObject geoData = locationMediaSearch.geocode(latitude, longitude);

        if (geoData != null && geoData.get("results").isJsonArray()) {
            JsonArray resultsArray = geoData.getAsJsonArray("results");
            if (resultsArray.size() > 0) {
                JsonObject firstResult = resultsArray.get(0).getAsJsonObject();
                String formattedAddress = firstResult.get("formatted").getAsString();
                return Optional.of(formattedAddress);
            }
        } else {
            LOG.warn("getGeoCodeFormatted() - No results found in geocode data or geoData is null.");
        }
        return Optional.empty();
    }

    public Optional<Map<String, Object>> getLocation() {
        double[] coordinates = GenLatLot.generateRandomLandCoordinates();
        double latitude = coordinates[0];
        double longitude = coordinates[1];

        JsonObject geoData = locationMediaSearch.geocode(latitude, longitude);

        if (geoData != null && geoData.has("results") && geoData.get("results").isJsonArray()) {
            JsonArray resultsArray = geoData.getAsJsonArray("results");
            if (resultsArray.size() > 0) {
                JsonObject firstResult = resultsArray.get(0).getAsJsonObject();
                String formattedAddress = firstResult.has("formatted") ? firstResult.get("formatted").getAsString() : null;

                if (formattedAddress != null) {
                    JsonObject location = LocationMediaSearch.fetchPixabayPhotos(formattedAddress);

                    if (location != null && location.has("page")) {
                        boolean photosArray = location.has("page");
                        if (photosArray) {
                            Map<String, Object> resultMap = new Gson().fromJson(location, new TypeToken<Map<String, Object>>() {
                            }.getType());
                            return Optional.of(resultMap);
                        } else {
                            LOG.warn("getLocation() - No photos found in Pixabay response for {}", formattedAddress);
                        }
                    } else {
                        LOG.warn("getLocation() - Invalid or empty Pixabay response for {}. Response: {}", formattedAddress, location);
                    }
                } else {
                    LOG.warn("getLocation() - Formatted address is null for coordinates ({}, {})", latitude, longitude);
                }
            }
        } else {
            LOG.warn("getLocation() - No results found in geocode data or geoData is null. Response: {}", geoData);
        }
        return Optional.empty();
    }

    @Transactional
    public void generateFakeUser(int number) {
        if (userRepository.findUsers() < 1000) {
            List<User> users = new ArrayList<>();
            List<Hashtag> tagList = hashtagRepository.findAll();

            for (int i = 0; i < number; i++) {
                LocalDate dateOfBirth = faker.date().birthday(18, 65).toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
                String email;
                String name;
                do {
                    email = faker.internet().emailAddress();
                    name = faker.name().username();
                } while (userRepository.findUserByEmail(email).isPresent() || userRepository.findByName(name).isPresent());

                User user = new User();
                user.setId(generateId());
                user.setName(name);
                user.setEmail(email);
                user.setLocation(faker.address().fullAddress());
                user.setPassword(faker.internet().password());
                user.setBio(faker.lorem().sentence());
                user.setDate_create(LocalDateTime.now());
                user.setProfile_picture("https://picsum.photos/600/600?random=" + UUID.randomUUID());
                user.setGender(random.nextBoolean() ? GenderEnum.M : GenderEnum.F);
                user.setDate_of_birth(dateOfBirth);
                user.setDate_last_update(LocalDateTime.now());
                String qrData = "user-" + user.getName();
                user.setQr_code(qrData);
                List<Hashtag> selectTag = tagList.stream().limit(Math.min(random.nextInt(6), 5)).collect(Collectors.toList());
                user.setUser_hashtag_id(random.nextBoolean() ? null : selectTag);

                users.add(user);
            }
            // Save all users at once
            userRepository.saveAll(users);
        }
    }

    @Transactional
    public void generateFakeTag(int number) {
        if (hashtagRepository.count() < 2000) {
            for (int i = 0; i < number; i++) {
                String name;
             do {
                    name = faker.lorem().word();
                } while (hashtagRepository.findByName(name).isPresent() || name.length() < 3);

                Hashtag tag = new Hashtag();
                tag.setId(generateId());
                tag.setName(name);
                hashtagRepository.save(tag);
            }
        }
    }

    @Transactional
    public void generateFakeMedia(int number) {
        try {
            List<Long> userCount = userRepository.findCountUsers();
            if (userCount.isEmpty()) {
                System.err.println("No users available to associate with media.");
                return;
            }

            List<Media> mediaBatch = new ArrayList<>(number);
            Random random = new Random();
            MediaEnum[] mediaTypes = MediaEnum.values();

            for (int i = 0; i < number; i++) {
                String randomUserId = userCount.get(random.nextInt(userCount.size())).toString();
                MediaEnum randomMediaType = mediaTypes[random.nextInt(mediaTypes.length)];

                MediaId mediaId = new MediaId();
                mediaId.setId(generateId());
                mediaId.setType(randomMediaType);

                User user = new User();
                user.setId(randomUserId);

                Media media = new Media();
                media.setId(mediaId);
                media.setMedia_user_id(user);
                String uniqueImageUrl = "https://picsum.photos/600/600?random=" + UUID.randomUUID();
                media.setUrl(uniqueImageUrl);
                media.setCreate_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
                double[] val = GenLatLot.generateRandomLandCoordinates();
                media.setLongitude(val[1]);
                media.setLatitude(val[0]);
                //System.out.println("Media: " + media);
                mediaBatch.add(media);
            }
            mediaRepository.saveAll(mediaBatch);
        } catch (Exception e) {
            System.err.println("Error generating media batch: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Transactional
    public void generateFakeHighlight(int number) {
        try {
            List<String> listUsersMedia = mediaRepository.findAllUserIdMedia();
            if (listUsersMedia.isEmpty()) {
                System.err.println("No users available to associate with media.");
                return;
            }

            List<Highlight> highlightBatch = new ArrayList<>(number);

            for (int i = 0; i < number; i++) {
                int randomUserIndex = random.nextInt(listUsersMedia.size());
                String randomUserId = listUsersMedia.get(randomUserIndex);
                List<Media> userMediaList = mediaRepository.findAllMediaByUserId(randomUserId);
                if (userMediaList.isEmpty()) continue;

                List<Media> selectedMediaList = userMediaList.stream()
                        .limit(Math.min(random.nextInt(6), 5) + 1)
                        .collect(Collectors.toList());

                User user = new User();
                user.setId(randomUserId);

                Highlight highlight = new Highlight();
                highlight.setId(generateId());
                highlight.setHighlight_user_id(user);
                highlight.setHighlight_medias(selectedMediaList);
                highlight.setImage("https://picsum.photos/600/600?random=" + UUID.randomUUID());
                highlight.setName(faker.hipster().word());
                highlight.setVisibility(faker.random().nextBoolean());
                highlight.setCreated_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
                highlight.setUpdated_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());

                highlightBatch.add(highlight);
            }

            highlightRepository.saveAll(highlightBatch);
        } catch (Exception e) {
            System.err.println("Error generating highlight  batch: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Transactional
    public void generateFakeStory(int number) {
        try {
            List<String> listUsersMedia = mediaRepository.findAllUserIdMedia();
            if (listUsersMedia.isEmpty()) {
                System.err.println("No media available to associate with stories.");
                return;
            }

            Random random = new Random();
            List<Story> storyBatch = new ArrayList<>(number);

            for (int i = 0; i < number; i++) {
                int randomUserIndex = random.nextInt(listUsersMedia.size());
                String randomUserId = listUsersMedia.get(randomUserIndex);

                List<Media> userMediaList = mediaRepository.findAllMediaByUserId(randomUserId);
                if (userMediaList.isEmpty()) continue;

                Media randomMedia = userMediaList.get(random.nextInt(userMediaList.size()));

                User user = new User();
                user.setId(randomUserId);
                Media media = new Media();
                media.setId(new MediaId(randomMedia.getId().getId(), randomMedia.getId().getType()));

                Story story = new Story();
                story.setId(generateId());
                story.setStory_media_id(media);
                story.setStory_user_id(user);
                story.setCreate_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
                story.setExpiration(false);
                story.setExpiration_time(LocalDateTime.now().plusDays(1));

                //System.out.println("Story: " + story);
                storyBatch.add(story);
            }

            storyRepository.saveAll(storyBatch);
        } catch (Exception e) {
            LOG.error("Error generating stories: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakePost(int number) {
        try {
            List<String> listUsersMedia = mediaRepository.findAllUserIdMedia();
            List<Hashtag> tagList = hashtagRepository.findAll();
            List<User> listUsers = userRepository.findAll();

            if (listUsersMedia.isEmpty()) {
                System.err.println("No users available to generate posts.");
                return;
            }

            Random random = new Random();
            List<Post> postBatch = new ArrayList<>(number);
            PostEnum[] postTypes = PostEnum.values();

            for (int i = 0; i < number; i++) {
                int randomUserIndex = random.nextInt(listUsersMedia.size());
                String randomUserId = listUsersMedia.get(randomUserIndex);

                List<Media> userMediaList = mediaRepository.findAllMediaByUserId(randomUserId);
                if (userMediaList.isEmpty() && !postTypes[i % postTypes.length].equals(PostEnum.TEXT)) continue;

                Post post = new Post();
                PostEnum randomType = postTypes[random.nextInt(postTypes.length)];

                PostId postId = new PostId();
                postId.setId(generateId());
                postId.setType(randomType);
                post.setId(postId);

                User user = new User();
                user.setId(randomUserId);
                post.setPost_user_id(user);

                post.setDescription(faker.lorem().paragraph(2));
                post.setVisible(random.nextBoolean());

                post.setCreate_at(faker.date().birthday(18, 19).toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate().atStartOfDay());
                post.setUpdate_at((random.nextBoolean() ?
                        faker.date().birthday(1, 4).toInstant()
                                .atZone(ZoneId.systemDefault())
                                .toLocalDate() : LocalDate.now())
                        .atStartOfDay());

                List<User> tags = listUsers.stream()
                        .limit(Math.min(random.nextInt(4), 3))
                        .collect(Collectors.toList());

                List<Hashtag> selectedTags = tagList.stream()
                        .limit(Math.min(random.nextInt(6), 5))
                        .collect(Collectors.toList());

                post.setPost_hashtag_id(random.nextBoolean() ? null : selectedTags);
                post.setTagged_users(random.nextBoolean() ? null : tags);

                if (randomType == PostEnum.TEXT) {
//                    List<Media> selectedTextMedia = userMediaList.stream()
//                            .filter(media -> media.getId().getType() == MediaEnum.TEXT)
//                            .limit(1) // Only one text media
//                            .collect(Collectors.toList());
                    post.setPost_medias_id(null);

                } else if (randomType == PostEnum.REEL) {
                    // Reel posts can have only video media
                    List<Media> selectedVideoMedia = userMediaList.stream()
                            .filter(media -> media.getId().getType() == MediaEnum.VIDEO)
                            .limit(1)
                            .collect(Collectors.toList());
                    post.setPost_medias_id(selectedVideoMedia);

                } else {
                    List<Media> selectedMediaList = userMediaList.stream()
                            .limit(Math.min(random.nextInt(6), 5) + 1)
                            .collect(Collectors.toList());
                    post.setPost_medias_id(selectedMediaList);
                }

                if (randomType != PostEnum.TEXT) {
                    List<String> mediaIds = userMediaList.stream()
                            .map(media -> media.getId().getId())
                            .collect(Collectors.toList());
                    Long count = postRepository.countPostsByUserIdAndMediaIds(randomUserId, mediaIds);
                    if (count > 0) continue;
                }

                postBatch.add(post);
            }

            postRepository.saveAll(postBatch);
        } catch (Exception e) {
            LOG.error("Error generating posts: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakeComment(int number) {
        try {
            Faker faker = new Faker();
            Random random = new Random();
            Boolean source;

            List<String> listUsersMedia = mediaRepository.findAllUserIdMedia();
            if (listUsersMedia.isEmpty()) {
                System.err.println("No users available to generate comments.");
                return;
            }

            List<Comment> existingComments = commentRepository.findAll();
            List<Comment> commentBatch = new ArrayList<>(number);

            for (int i = 0; i < number; i++) {
                String randomUserId = listUsersMedia.get(random.nextInt(listUsersMedia.size()));
                List<Media> userMediaList = mediaRepository.findAllMediaByUserId(randomUserId);
                List<Post> userPosts = postRepository.findAllPostByUserId(randomUserId);
                List<Journal> userJournal = journalRepository.findAllJournalByUser(randomUserId);

                if (userMediaList.isEmpty() || userPosts.isEmpty() || userJournal.isEmpty()) continue;

                Media selectedMedia = userMediaList.get(random.nextInt(userMediaList.size()));
                Post selectedPost = userPosts.get(random.nextInt(userPosts.size()));
                Journal selectJournal = userJournal.get(random.nextInt(userJournal.size()));

                Comment comment = new Comment();
                CommnetEnum[] commentTypes = CommnetEnum.values();
                CommnetEnum randomType = commentTypes[random.nextInt(commentTypes.length)];

                CommentId commentId = new CommentId();
                commentId.setId(generateId());
                commentId.setType(randomType);
                comment.setId(commentId);

                User user = new User();
                user.setId(randomUserId);

                comment.setComment_user_id(user);
                comment.setComment_post_id(randomType == CommnetEnum.POST ? selectedPost : null);
                comment.setComment_media_id(randomType == CommnetEnum.MEDIA ? selectedMedia : null);
                comment.setComment_journal_id(randomType == CommnetEnum.JOURNAL ? selectJournal : null);
                comment.setMessage(faker.lorem().sentence());
                comment.setCreate_at(LocalDateTime.now());

                source = faker.random().nextBoolean();
                comment.setComment_source_id(source && !existingComments.isEmpty() ? existingComments.get(random.nextInt(existingComments.size())) : null);

                //System.out.println("Comment: " + comment);
                commentBatch.add(comment);
            }

            commentRepository.saveAll(commentBatch);
        } catch (Exception e) {
            LOG.error("Error generating comments: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakeFollower(int number) {
        try {
            Faker faker = new Faker();
            Random random = new Random();
            List<String> listUsers = userRepository.allUsers();

            if (listUsers.size() < 2) {
                System.err.println("Not enough users available to generate followers.");
                return;
            }

            List<Follower> followerBatch = new ArrayList<>(number);

            for (int i = 0; i < number; i++) {
                String randomUserId = listUsers.get(random.nextInt(listUsers.size())).toString();
                String randomUserIdSend;

                do {
                    randomUserIdSend = listUsers.get(random.nextInt(listUsers.size())).toString();
                } while (randomUserId.equals(randomUserIdSend));

                FollowerStatusEnum randomStatus = FollowerStatusEnum.values()[random.nextInt(FollowerStatusEnum.values().length)];
                FollowerId followerId = new FollowerId();
                followerId.setId(generateId());
                followerId.setStatus(randomStatus);

                User user = new User();
                user.setId(randomUserId);

                User userSend = new User();
                userSend.setId(randomUserIdSend);

                Follower follower = new Follower();
                follower.setId(followerId);
                follower.setFollower_user_id(user);
                follower.setFollower_user_id_follower(userSend);
                follower.setCreated_at(faker.date().birthday(0, 4).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());

                Long count = followerRepository.findFollowerIfExists(randomUserId, randomUserIdSend);
                if (count > 0) continue;

                //System.out.println("Follower: " + follower);
                followerBatch.add(follower);
            }

            followerRepository.saveAll(followerBatch);
        } catch (Exception e) {
            LOG.error("Error generating followers: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakeLike(int number) {
        try {
            Faker faker = new Faker();
            Random random = new Random();

            List<String> listUsers = userRepository.allUsers();
            if (listUsers.isEmpty()) {
                System.err.println("No users available to generate likes.");
                return;
            }

            List<Like> likeBatch = new ArrayList<>(number);

            for (int i = 0; i < number; i++) {
                String randomUserId = listUsers.get(random.nextInt(listUsers.size())).toString();

                LikeContentEnum randomTypeContent = LikeContentEnum.values()[random.nextInt(LikeContentEnum.values().length)];
                LikeEnum randomType = LikeEnum.values()[random.nextInt(LikeEnum.values().length)];

                LikeId likeId = new LikeId();
                likeId.setId(generateId());
                likeId.setType(randomType);
                likeId.setContent(randomTypeContent);

                List<Media> mediaList = mediaRepository.findAllMediaWithoutUserId(randomUserId, randomType.toString());
                List<Post> postList = postRepository.findAllPostWithoutUserId(randomUserId);
                List<Comment> commentList = commentRepository.findAll();

                User user = new User();
                user.setId(randomUserId);

                Like like = new Like();
                like.setId(likeId);
                like.setLike_user_id(user);

                Media mediaId = null;
                Post postId = null;
                Comment commentId = null;

                switch (randomType) {
                    case REEL, TEXT:
                        if (!mediaList.isEmpty()) {
                            mediaId = mediaList.get(random.nextInt(mediaList.size()));
                            like.setLike_media_id(mediaId);
                        }
                        break;
                    case POST:
                        if (!postList.isEmpty()) {
                            postId = postList.get(random.nextInt(postList.size()));
                            like.setLike_post_id(postId);
                        }
                        break;
                    case COMMENT:
                        if (!commentList.isEmpty()) {
                            commentId = commentList.get(random.nextInt(commentList.size()));
                            like.setLike_comment_id(commentId);
                        }
                        break;
                }

                like.setCreate_at(faker.date().birthday(0, 4).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
                Long count = likeRepository.findLikeIfExists(randomUserId,
                        mediaId == null ? null : mediaId.getId(),
                        postId == null ? null : postId.getId(),
                        commentId == null ? null : commentId.getId());
                if (count > 0) continue;

                //System.out.println("Like: " + like);
                likeBatch.add(like);
            }

            likeRepository.saveAll(likeBatch);
        } catch (Exception e) {
            LOG.error("Error generating likes: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakeShare(int number) {
        try {
            Faker faker = new Faker();
            Random random = new Random();

            List<String> listUsers = userRepository.allUsers();
            List<Media> mediaList = mediaRepository.findAll();
            List<Post> postList = postRepository.findAll();
            List<Story> storyList = storyRepository.findAll();

            if (listUsers.isEmpty()) {
                System.err.println("No users available to generate shares.");
                return;
            }

            List<Share> shareBatch = new ArrayList<>(number);

            for (int i = 0; i < number; i++) {
                String randomUserId = listUsers.get(random.nextInt(listUsers.size())).toString();
                String randomUserIdShared;

                do {
                    randomUserIdShared = listUsers.get(random.nextInt(listUsers.size())).toString();
                } while (randomUserId.equals(randomUserIdShared));

                ShareEnum randomType = ShareEnum.values()[random.nextInt(ShareEnum.values().length)];

                ShareId shareId = new ShareId();
                shareId.setId(generateId());
                shareId.setType(randomType.toString());

                User user = new User();
                user.setId(randomUserId);

                User userShared = new User();
                userShared.setId(randomUserIdShared);

                Share share = new Share();
                share.setShareId(shareId);
                share.setShare_user_id(user);
                share.setShare_user_id_sharled(userShared);
                share.setUpdate_at(faker.date().birthday(0, 4).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
                share.setCreate_at(faker.date().birthday(0, 4).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());

                switch (randomType) {
                    case MEDIA:
                        if (!mediaList.isEmpty()) {
                            Media media = mediaList.get(random.nextInt(mediaList.size()));
                            share.setShare_media_id(media);
                        }
                        break;
                    case POST:
                        if (!postList.isEmpty()) {
                            Post post = postList.get(random.nextInt(postList.size()));
                            share.setShare_post_id(post);
                        }
                        break;
                    case STORY:
                        if (!storyList.isEmpty()) {
                            Story story = storyList.get(random.nextInt(storyList.size()));
                            share.setShare_story_id(story);
                        }
                        break;
                }
                share.setDescription(faker.lorem().paragraph(1));

                //System.out.println("Share: " + share);
                shareBatch.add(share);
            }

            shareRepository.saveAll(shareBatch);
        } catch (Exception e) {
            LOG.error("Error generating shares: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakeGroup(int number) {
        List<Group> groups = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            Group group = new Group();
            group.setId(generateId());
            group.setName(faker.superhero().name());
            group.setUrl("https://picsum.photos/600/600?random=" + UUID.randomUUID());
            group.setUpdated_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
            group.setCreate_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
            group.setDescription(faker.superhero().descriptor());

            groups.add(group);
        }
        groupRepository.saveAll(groups);
    }

    @Transactional
    public void generateFakeGroupMembers(int number) {
        List<GroupMembership> groupMemberships = new ArrayList<>();
        Role[] roles = Role.values();
        List<User> users = userRepository.findAll();
        List<Group> groups = groupRepository.findAll();

        Set<String> existingMemberships = groupMembershipRepository.findAll().stream().map(m -> m.getUser_id().getId() + "_" + m.getGroup_id().getId()).collect(Collectors.toSet());
        for (int i = 0; i < number; i++) {
            User user = users.get(random.nextInt(users.size()));
            Group group = groups.get(random.nextInt(groups.size()));

            String membershipKey = user.getId() + "_" + group.getId();
            if (existingMemberships.contains(membershipKey)) {
                continue;
            }

            GroupMembershipId groupMembershipId = new GroupMembershipId();
            groupMembershipId.setId(generateId());
            groupMembershipId.setRole(roles[random.nextInt(roles.length)]);

            GroupMembership groupMembership = new GroupMembership();
            groupMembership.setId(groupMembershipId);
            groupMembership.setJoined_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
            groupMembership.setUser_id(user);
            groupMembership.setGroup_id(group);

            groupMemberships.add(groupMembership);
            existingMemberships.add(membershipKey);
        }
        groupMembershipRepository.saveAll(groupMemberships);
    }

    @Transactional
    public void generateFakeMessage(int number) {
        List<Message> messages = new ArrayList<>();
        MessageEnum[] messageEnums = MessageEnum.values();

        List<User> users = userRepository.findAll();
        List<Post> posts = postRepository.findAll();
        List<Story> stories = storyRepository.findAll();
        List<Group> groups = groupRepository.findAll();
        for (int i = 0; i < number; i++) {
            MessagesId messagesId = new MessagesId();
            messagesId.setId(generateId());
            MessageEnum m = messageEnums[random.nextInt(messageEnums.length)];
            messagesId.setType(m);
            User user = users.get(random.nextInt(users.size()));
            List<User> finds = followerRepository.findUsersByStatus(user.getName(), FollowerStatusEnum.ACCEPTED);
            Message message = new Message();
            message.setId(messagesId);
            message.setContent(faker.lorem().paragraph(2));
            message.setCreated_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
            message.setUpdated_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());

            message.setGroup_id(faker.random().nextBoolean() ? groups.get(random.nextInt(groups.size())) : null);
            message.setPost_id(m == MessageEnum.POST ? posts.get(random.nextInt(posts.size())) : null);
            message.setStory_id(m == MessageEnum.STORY ? stories.get(random.nextInt(stories.size())) : null);
            message.setSender_id(user);
            message.setRecipient_id(finds.get(random.nextInt(finds.size())));

            messages.add(message);
        }
        messageRepository.saveAll(messages);
    }

    @Transactional
    public void generateFakeMessageReadStatus(int number) {
        List<MessageReadStatus> messageReadStatuses = new ArrayList<>();
        List<Message> messages = messageRepository.findAll();
        for (int i = 0; i < number; i++) {
            MessageReadStatus message = new MessageReadStatus();
            message.setId(generateId());
            message.setIs_read(faker.random().nextBoolean());
            message.setRead_at(faker.date().birthday(18, 65).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());

            Message m = messages.get(random.nextInt(messages.size()));
            message.setMessage_id(m);
            message.setUser_id(faker.random().nextBoolean() ? m.getRecipient_id() : m.getSender_id());

            messageReadStatuses.add(message);
        }
        messageReadStatusRepository.saveAll(messageReadStatuses);
    }

    @Transactional
    public void generateFakeHobby(int number) {
        List<Hobby> hobbies = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            Hobby hobby = new Hobby();
            hobby.setId(generateId());
            hobby.setName(faker.funnyName().name());
            hobby.setDescription(faker.lorem().sentence());

            hobbies.add(hobby);
        }
        hobbyRepository.saveAll(hobbies);
    }

    @Transactional
    public void generateFakeTravelDestination(int number) {
        List<TravelDestination> travelDestinations = new ArrayList<TravelDestination>();
        for (int i = 0; i < number; i++) {
            TravelDestination travelDestination = new TravelDestination();
            travelDestination.setId(generateId());
            travelDestination.setName(faker.funnyName().name());
            travelDestination.setCountry(faker.country().name());
            travelDestination.setDescription(faker.lorem().sentence());

            travelDestinations.add(travelDestination);
        }
        travelDestionationRepository.saveAll(travelDestinations);
    }

    @Transactional
    public void generateFakeJournal(int number) {
        List<Journal> journals = new ArrayList<>();
        List<User> users = userRepository.findAll();
        List<Hobby> hobbies = hobbyRepository.findAll();
        List<TravelDestination> travelDestinations = travelDestionationRepository.findAll();
        for (int i = 0; i < number; i++) {

            List<Hobby> selectHobby = hobbies.stream().limit(Math.min(random.nextInt(6), 5)).collect(Collectors.toList());
            List<TravelDestination> selectTravelDestination = travelDestinations.stream().limit(Math.min(random.nextInt(6), 5)).collect(Collectors.toList());

            Journal journal = new Journal();
            journal.setId(generateId());
            journal.setTittle(faker.dune().title());
            journal.setContent(faker.lorem().sentence());
            journal.setCreate_at(faker.date().birthday(0, 4).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
            journal.setUpdate_at(faker.date().birthday(0, 4).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay());
            journal.setUser_id(users.get(random.nextInt(users.size())));
            journal.setHobby_ids(selectHobby);
            journal.setTravel_destination_ids(selectTravelDestination);

            journals.add(journal);
        }
        journalRepository.saveAll(journals);
    }

    public String generateId() {
        return String.valueOf(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE);
    }

}