package com.example.App.Generate;

import com.example.App.Dashbord.Embedded.*;
import com.example.App.Dashbord.Enum.*;
import com.example.App.Dashbord.Model.*;
import com.example.App.Dashbord.Repository.*;
import com.example.App.Journal.Model.Hobby;
import com.example.App.Journal.Model.Journal;
import com.example.App.Journal.Model.TravelDestination;
import com.example.App.Journal.Repository.HobbyRepository;
import com.example.App.Journal.Repository.JournalRepository;
import com.example.App.Journal.Repository.TravelDestionationRepository;
import com.example.App.Messenger.Embedded.GroupMembershipId;
import com.example.App.Messenger.Embedded.MessagesId;
import com.example.App.Messenger.Enum.GroupMembershipEnum;
import com.example.App.Messenger.Enum.MessageEnum;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import static com.example.App.Generate.LocationMediaSearch.fetchRandomPixabayVideoUrl;

@Service
public class GenService {
    private static final Faker faker = new Faker();
    private static final Random random = new Random();
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(GenService.class);
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
        try {
            if(userRepository.count() < 100) {
                LOG.info("START--user");
                long startTime = System.currentTimeMillis();
                Set<User> users = new HashSet<>(number);
                List<Hastag> tagList = hashtagRepository.findAll();
                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

                while (users.size() < number) {
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
                    user.setPassword(passwordEncoder.encode("123asd,./A"));
                    user.setBio(String.join("\n\n", faker.lorem().paragraphs(3)));
                    user.setDate_create(this.getDate(10, 20).atStartOfDay());
                    user.setProfile_picture("https://picsum.photos/seed/" + UUID.randomUUID() + "/600/600");
                    user.setGender(random.nextBoolean() ? GenderEnum.M : GenderEnum.F);
                    user.setDate_of_birth(this.getDate(20, 65));
                    user.setDate_last_update(LocalDateTime.now());
                    String qrData = "user-" + user.getName();
                    user.setQr_code(qrData);
                    List<Hastag> selectTag = getRandomSubset(tagList, random, 6);
                    user.setUser_hashtag_id(random.nextBoolean() ? null : selectTag);

                    if (users.stream().noneMatch(existingUser -> existingUser.getEmail().equals(user.getEmail()) || existingUser.getName().equals(user.getName()))) {
                        users.add(user);
                    }
                }
                long endTime = System.currentTimeMillis();
                long duration = endTime - startTime;
                LOG.info("size users: " + users.size() + " duration: " + duration);
                userRepository.saveAll(users);
            }
        } catch (Exception e) {
            System.err.println("Error generating users batch: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Transactional
    public void generateFakeTag(int number) {
        if (hashtagRepository.count() < 2000) {
            long startTime = System.currentTimeMillis();
            LOG.info("START--tag");
            Set<String> existingNames = new HashSet<>(hashtagRepository.findAllTagsByName());
            List<Hastag> hashtagsToSave = new ArrayList<>(number);

            for (int i = 0; i < number; i++) {
                String name;
//                do {
                    name = faker.lorem().word();
//                } while (existingNames.contains(name) || name.length() < 3);

                existingNames.add(name);

                Hastag tag = new Hastag();
                tag.setId(generateId());
                tag.setName(name);
                hashtagsToSave.add(tag);
            }
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            LOG.info("size tag: " + hashtagsToSave.size() + " duration: " + duration);
            hashtagRepository.saveAll(hashtagsToSave);
        }
    }


    @Transactional
    public void generateFakeMedia(int number) {
        try {
            if(mediaRepository.count() < 5000) {
                long startTime = System.currentTimeMillis();
                LOG.info("START--media");
                Set<Media> mediaBatch = new HashSet<>(number);
                MediaEnum[] mediaTypes = MediaEnum.values();
                List<User> users = userRepository.findAll();
                List<Group> groups = groupRepository.findAll();

                while (mediaBatch.size() < number) {
                    boolean randomBoolean = random.nextBoolean();
                    MediaEnum randomMediaType = mediaTypes[random.nextInt(mediaTypes.length)];
                    MediaId mediaId = new MediaId();
                    mediaId.setId(generateId());
                    mediaId.setType(randomMediaType);

                    User user = new User();
                    user.setId(users.get(random.nextInt(users.size())).getId());
                    Group group = new Group();
                    group.setId(groups.get(random.nextInt(groups.size())).getId());

                    Media media = new Media();
                    media.setId(mediaId);
                    media.setMedia_user_id(randomBoolean ? user : null);
                    media.setMedia_group_id(!randomBoolean ? group : null);
                    media.setUrl(randomMediaType.equals(MediaEnum.PHOTO) ? "https://picsum.photos/seed/" + UUID.randomUUID() + "/600/600" : fetchRandomPixabayVideoUrl());
                    media.setCreate_at(this.getDate(10, 20).atStartOfDay());
                    double[] val = GenLatLot.generateRandomLandCoordinates();
                    media.setLongitude(val[1]);
                    media.setLatitude(val[0]);
                    mediaBatch.add(media);
                }
                long endTime = System.currentTimeMillis();
                long duration = endTime - startTime;
                LOG.info("size media: " + mediaBatch.size() + " duration: " + duration);
                mediaRepository.saveAll(mediaBatch);
            }
        } catch (Exception e) {
            System.err.println("Error generating media batch: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Transactional
    public void generateFakeHighlight(int number) {
        try {
            long startTime = System.currentTimeMillis();
            LOG.info("START--highlight");
            List<Media> listUsersMedia = mediaRepository.findAllUserId();
            Set<Highlight> highlightBatch = new HashSet<>(number);

            while (highlightBatch.size() < number) {
                Media randomMedia = listUsersMedia.get(random.nextInt(listUsersMedia.size()));
                String userId = randomMedia.getMedia_user_id().getId();
                List<Media> userMediaList = mediaRepository.findAllMediaByUserId(userId);
                if (userMediaList.isEmpty()) {
                    continue;
                }

                User user = new User();
                user.setId(userId);

                Highlight highlight = new Highlight();
                highlight.setId(generateId());
                highlight.setHighlight_user_id(user);
                highlight.setHighlight_medias(userMediaList);
                highlight.setImage("https://picsum.photos/seed/" + UUID.randomUUID() + "/600/600");
                highlight.setName(faker.hipster().word());
                highlight.setVisibility(faker.random().nextBoolean());
                highlight.setCreated_at(this.getDate(10, 20).atStartOfDay());
                highlight.setUpdated_at(this.getDate(10, 20).atStartOfDay());

                highlightBatch.add(highlight);
            }
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            LOG.info("size highlight: " + highlightBatch.size() + " duration: " + duration);
            highlightRepository.saveAll(highlightBatch);
        } catch (Exception e) {
            System.err.println("Error generating highlight  batch: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Transactional
    public void generateFakeStory(int number) {
        try {
            long startTime = System.currentTimeMillis();
            LOG.info("START--story");
            List<Media> listUsersMedia = mediaRepository.findAllUserId();
            Set<Story> storyBatch = new HashSet<>(number);

            while (storyBatch.size() < number) {
                Media randomMedia = listUsersMedia.get(random.nextInt(listUsersMedia.size()));
                String userId = randomMedia.getMedia_user_id().getId();
                List<Media> userMediaList = mediaRepository.findAllMediaByUserId(userId);
                if (userMediaList.isEmpty()) {
                    continue;
                }
                List<Media> selectedMediaList = getRandomSubset(userMediaList, random, 6);

                Story story = new Story();
                story.setId(generateId());
                User user = new User();
                user.setId(userId);
                story.setStory_user_id(user);
                story.setStory_medias(selectedMediaList);
                story.setCreate_at(this.getDate(10, 20).atStartOfDay());
                story.setExpiration(false);
                story.setExpiration_time(LocalDateTime.now().plusDays(1));

                storyBatch.add(story);
            }
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            LOG.info("size story: " + storyBatch.size() + " duration: " +duration);
            storyRepository.saveAll(storyBatch);
        } catch (Exception e) {
            LOG.error("Error generating stories", e);
        }
    }

    @Transactional
    public void generateFakePost(int number) {
        try {
            if(postRepository.count() < 1000) {
                long startTime = System.currentTimeMillis();
                LOG.info("START--post");
                List<Media> listUsersMedia = mediaRepository.findAllUserId();
                List<Media> listGroupsMedia = mediaRepository.findAllGroupId();
                List<Hastag> tagList = hashtagRepository.findAll();
                List<User> listUsers = userRepository.findAll();
                PostEnum[] postTypes = PostEnum.values();
                Set<Post> postBatch = new HashSet<>(number);

                for (int i = 0; i < number; i++) {
                    boolean isUserPost = random.nextBoolean();
                    Media randomMedia = isUserPost ? listUsersMedia.get(random.nextInt(listUsersMedia.size())) : listGroupsMedia.get(random.nextInt(listGroupsMedia.size()));

                    String entityId = isUserPost ? randomMedia.getMedia_user_id().getId() : randomMedia.getMedia_group_id().getId();
                    List<Media> mediaList = isUserPost ? mediaRepository.findAllMediaByUserId(entityId) : mediaRepository.findAllMediaByGroupId(entityId);

                    PostEnum randomType = postTypes[random.nextInt(postTypes.length)];

                    if (mediaList.isEmpty() && randomType != PostEnum.TEXT) continue;

                    Post post = new Post();
                    PostId postId = new PostId(generateId(), randomType);
                    post.setId(postId);

                    if (isUserPost) {
                        User user = new User();
                        user.setId(entityId);
                        post.setPost_user_id(user);
                    } else {
                        Group group = new Group();
                        group.setId(entityId);
                        post.setPost_group_id(group);
                    }

                    post.setDescription(faker.lorem().paragraph(2));
                    post.setVisible(true);

                    LocalDateTime date = faker.date().birthday(18, 19).toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate().atStartOfDay();
                    post.setCreate_at(date);
                    post.setUpdate_at(date);

                    if (random.nextBoolean()) post.setTagged_users(getRandomSubset(listUsers, random, 3));
                    if (random.nextBoolean()) post.setPost_hashtag_id(getRandomSubset(tagList, random, 5));

                    post.setPost_medias_id(getMediaForPostType(randomType, mediaList));

                    postBatch.add(post);
                }

                long endTime = System.currentTimeMillis();
                long duration = endTime - startTime;
                LOG.info("size post: " + postBatch.size() + " duration: " + duration);
                postRepository.saveAll(postBatch);
            }
        } catch (Exception e) {
            LOG.error("Error generating posts: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakeComment(int number) {
        try {
            if(commentRepository.count() < 1000) {
                long startTime = System.currentTimeMillis();
                LOG.info("START--comment");
                Set<Comment> commentBatch = new HashSet<>(number);
                List<Media> listUsersMedia = mediaRepository.findAllUserId();
                CommentEnum[] commentTypes = CommentEnum.values();

                Map<String, List<Media>> userMediaMap = new HashMap<>();
                Map<String, List<Post>> userPostsMap = new HashMap<>();
                Map<String, List<Journal>> userJournalMap = new HashMap<>();

                for (Media media : listUsersMedia) {
                    String userId = media.getMedia_user_id().getId();
                    userMediaMap.putIfAbsent(userId, mediaRepository.findAllMediaByUserId(userId));
                    userPostsMap.putIfAbsent(userId, postRepository.findAllPostByUserId(userId));
                    userJournalMap.putIfAbsent(userId, journalRepository.findAllJournalByUser(userId));
                }

                for (int i = 0; i < number; i++) {
                    CommentEnum randomType = commentTypes[random.nextInt(commentTypes.length)];
                    String randomUserId = listUsersMedia.get(random.nextInt(listUsersMedia.size())).getMedia_user_id().getId();

                    List<Media> userMediaList = userMediaMap.get(randomUserId);
                    List<Post> userPosts = userPostsMap.get(randomUserId);
                    List<Journal> userJournal = userJournalMap.get(randomUserId);

                    if (userMediaList.isEmpty() || userPosts.isEmpty() || userJournal.isEmpty()) continue;

                    Media selectedMedia = userMediaList.get(random.nextInt(userMediaList.size()));
                    Post selectedPost = userPosts.get(random.nextInt(userPosts.size()));
                    Journal selectJournal = userJournal.get(random.nextInt(userJournal.size()));

                    Comment comment = new Comment();
                    CommentId commentId = new CommentId();
                    commentId.setId(generateId());
                    commentId.setType(randomType);
                    comment.setId(commentId);

                    User user = new User();
                    user.setId(randomUserId);

                    comment.setComment_user_id(user);
                    comment.setComment_post_id(randomType == CommentEnum.POST ? selectedPost : null);
                    comment.setComment_media_id(randomType == CommentEnum.MEDIA ? selectedMedia : null);
                    comment.setComment_journal_id(randomType == CommentEnum.JOURNAL ? selectJournal : null);
                    comment.setMessage(faker.lorem().sentence());
                    comment.setCreate_at(LocalDateTime.now());

                    List<Comment> existingComments = commentRepository.findAllByCommentEnum(randomType);
                    Boolean source = faker.random().nextBoolean();
                    comment.setComment_source_id(source && !existingComments.isEmpty() ? existingComments.get(random.nextInt(existingComments.size())) : null);

                    commentBatch.add(comment);
                }

                long endTime = System.currentTimeMillis();
                long duration = endTime - startTime;
                LOG.info("size comment: " + commentBatch.size() + " duration: " + duration);
                commentRepository.saveAll(commentBatch);
            }
        } catch (Exception e) {
            LOG.error("Error generating comments: " + e.getMessage(), e);
        }
    }


    @Transactional
    public void generateFakeFollower(int number) {
        try {
            if(followerRepository.count() < 1000) {
                long startTime = System.currentTimeMillis();
                LOG.info("START--follower");
                List<String> listUsers = userRepository.allUsers();
                Set<Follower> followerBatch = new HashSet<>(number);

                for (int i = 0; i < number; i++) {
                    String randomUserId = listUsers.get(random.nextInt(listUsers.size())).toString();
                    String randomUserIdSend;

                    do {
                        randomUserIdSend = listUsers.get(random.nextInt(listUsers.size())).toString();
                    } while (randomUserId.equals(randomUserIdSend));

                    FollowerStatusEnum randomStatus = FollowerStatusEnum.values()[random.nextInt(FollowerStatusEnum.values().length)];
                    FollowerId followerId = new FollowerId();
                    followerId.setId(generateId());
                    followerId.setStatus(FollowerStatusEnum.ACCEPTED);

                    User user = new User();
                    user.setId(randomUserId);

                    User userSend = new User();
                    userSend.setId(randomUserIdSend);

                    Follower follower = new Follower();
                    follower.setId(followerId);
                    follower.setFollower_user_id(user);
                    follower.setFollower_user_id_follower(userSend);
                    follower.setCreated_at(this.getDate(0, 5).atStartOfDay());

                    Long count = followerRepository.findFollowerIfExists(randomUserId, randomUserIdSend);
                    if (count > 0) continue;

                    followerBatch.add(follower);
                }
                long endTime = System.currentTimeMillis();
                long duration = endTime - startTime;
                LOG.info("size follower: " + followerBatch.size() + " duration: " + duration);
                followerRepository.saveAll(followerBatch);
            }
        } catch (Exception e) {
            LOG.error("Error generating followers: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakeLike(int number) {
        try {
            long startTime = System.currentTimeMillis();
            LOG.info("START--like");
            List<String> listUsers = userRepository.allUsers();
            List<Like> likeBatch = new ArrayList<>(number);

            Map<String, List<Media>> userMediaMap = new HashMap<>();
            Map<String, List<Post>> userPostsMap = new HashMap<>();
            List<Comment> allComments = commentRepository.findAll();

            for (String userId : listUsers) {
                userMediaMap.put(userId, mediaRepository.findAllMediaWithoutUserId(userId));
                userPostsMap.put(userId, postRepository.findAllPostWithoutUserId(userId));
            }

            for (int i = 0; i < number; i++) {
                String randomUserId = listUsers.get(random.nextInt(listUsers.size()));
                LikeContentEnum randomTypeContent = LikeContentEnum.values()[random.nextInt(LikeContentEnum.values().length)];
                LikeEnum randomType = LikeEnum.values()[random.nextInt(LikeEnum.values().length)];

                LikeId likeId = new LikeId();
                likeId.setId(generateId());
                likeId.setType(randomType);
                likeId.setContent(randomTypeContent);

                User user = new User();
                user.setId(randomUserId);

                Like like = new Like();
                like.setId(likeId);
                like.setLike_user_id(user);

                Media mediaId = null;
                Post postId = null;
                Comment commentId = null;

                switch (randomType) {
                    case REEL:
                        List<Media> mediaList = userMediaMap.get(randomUserId);
                        if (!mediaList.isEmpty()) {
                            mediaId = mediaList.get(random.nextInt(mediaList.size()));
                            like.setLike_media_id(mediaId);
                        }
                        break;
                    case POST:
                        List<Post> postList = userPostsMap.get(randomUserId);
                        if (!postList.isEmpty()) {
                            postId = postList.get(random.nextInt(postList.size()));
                            like.setLike_post_id(postId);
                        }
                        break;
                    case COMMENT, TEXT:
                        if (!allComments.isEmpty()) {
                            commentId = allComments.get(random.nextInt(allComments.size()));
                            like.setLike_comment_id(commentId);
                        }
                        break;
                }

                like.setCreate_at(this.getDate(0, 4).atStartOfDay());

                Long count = likeRepository.findLikeIfExists(randomUserId,
                        mediaId == null ? null : mediaId.getId(),
                        postId == null ? null : postId.getId(),
                        commentId == null ? null : commentId.getId());

                if (count > 0) continue;

                likeBatch.add(like);
            }
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            LOG.info("size like: " + likeBatch.size() + " duration: " +duration);
            likeRepository.saveAll(likeBatch);
        } catch (Exception e) {
            LOG.error("Error generating likes: " + e.getMessage(), e);
        }
    }


    @Transactional
    public void generateFakeShare(int number) {
        try {
            long startTime = System.currentTimeMillis();
            LOG.info("START--share");

            Map<String, List<Media>> mediaByUser = mediaRepository.findAll().stream()
                    .filter(media -> media.getMedia_user_id() != null)
                    .collect(Collectors.groupingBy(media -> media.getMedia_user_id().getId()));

            Map<String, List<Post>> postByUser = postRepository.findAll().stream()
                    .filter(post -> post.getPost_user_id() != null)
                    .collect(Collectors.groupingBy(post -> post.getPost_user_id().getId()));
            Map<String, List<Story>> storyByUser = storyRepository.findAll().stream()
                    .filter(story -> story.getStory_user_id() != null)
                    .collect(Collectors.groupingBy(story -> story.getStory_user_id().getId()));

            Set<Share> shareBatch = new HashSet<>(number);
            ThreadLocalRandom random = ThreadLocalRandom.current();
            LocalDateTime currentTime = this.getDate(0, 4).atStartOfDay();

            for (int i = 0; i < number; i++) {
                ShareEnum randomType = ShareEnum.values()[random.nextInt(ShareEnum.values().length)];
                Share share = new Share();
                share.setShareId(new ShareId(generateId(), randomType));

                String randomUserId = null;
                String randomUserIdShared = "";

                switch (randomType) {
                    case MEDIA:
                        randomUserId = getRandomUserIdWithContentMedia(mediaByUser);
                        break;
                    case POST:
                        randomUserId = getRandomUserIdWithContentPost(postByUser);
                        break;
                    case STORY:
                        randomUserId = getRandomUserIdWithContentStory(storyByUser);
                        break;
                }

                if (randomUserId == null) {
                    continue;
                }

                do {
                    randomUserIdShared = getRandomUserIdWithContentBasedOnType(mediaByUser, postByUser, storyByUser, randomType);
                } while (randomUserId.equals(randomUserIdShared));

                User userId = new User();
                userId.setId(randomUserId);
                User userIdShared = new User();
                userIdShared.setId(randomUserIdShared);

                share.setShare_user_id(userId);
                share.setShare_user_id_sharled(userIdShared);
                share.setUpdate_at(currentTime);
                share.setCreate_at(currentTime);

                switch (randomType) {
                    case MEDIA -> {
                        List<Media> mediaList = mediaByUser.get(randomUserId);
                        if (mediaList != null && !mediaList.isEmpty()) {
                            share.setShare_media_id(mediaList.get(random.nextInt(mediaList.size())));
                        }
                    }
                    case POST -> {
                        List<Post> postList = postByUser.get(randomUserId);
                        if (postList != null && !postList.isEmpty()) {
                            share.setShare_post_id(postList.get(random.nextInt(postList.size())));
                        }
                    }
                    case STORY -> {
                        List<Story> storyList = storyByUser.get(randomUserId);
                        if (storyList != null && !storyList.isEmpty()) {
                            share.setShare_story_id(storyList.get(random.nextInt(storyList.size())));
                        }
                    }
                }

                share.setDescription(faker.lorem().paragraph(1));
                shareBatch.add(share);
            }

            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            LOG.info("Size of generated shares: " + shareBatch.size() + " Duration: " + duration);
            shareRepository.saveAll(shareBatch);
        } catch (Exception e) {
            LOG.error("Error generating shares: {}", e.getMessage(), e);
        }
    }

    @Transactional
    public void generateFakeGroup(int number) {
        long startTime = System.currentTimeMillis();
        LOG.info("START--group");

        Set<Group> groups = new HashSet<>(number);
        for (int i = 0; i < number; i++) {
            String uniqueName;
            do {
                uniqueName = faker.superhero().name() + '-' + faker.name().fullName();
            } while (groupRepository.existsByName(uniqueName).isPresent());
            Group group = new Group();
            group.setId(generateId());
            group.setName(uniqueName);
            group.setUrl("https://picsum.photos/seed/" + UUID.randomUUID() + "/600/600");
            group.setUpdated_at(getDate(10, 30).atStartOfDay());
            group.setCreate_at(getDate(10, 30).atStartOfDay());
            group.setDescription(faker.lorem().sentence());
            groups.add(group);
        }
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        LOG.info("size group: " + groups.size() + " duration: " +duration);
        groupRepository.saveAll(groups);
    }


    @Transactional
    public void generateFakeGroupMembers(int number) {
        long startTime = System.currentTimeMillis();
        LOG.info("START--groupMembers");

        Set<GroupMembership> groupMemberships = new HashSet<>(number);
        GroupMembershipEnum[] roles = GroupMembershipEnum.values();
        List<User> users = userRepository.findAll();
        List<Group> groups = groupRepository.findAll();
        Set<String> existingMemberships = groupMembershipRepository.findAll().stream().map(m -> m.getUser_id().getId() + "_" + m.getGroup_id().getId()).collect(Collectors.toSet());
        ThreadLocalRandom random = ThreadLocalRandom.current();
        LocalDateTime joinedAt = getDate(10, 30).atStartOfDay();

        for (int i = 0; i < number; i++) {
            User user = users.get(random.nextInt(users.size()));
            Group group = groups.get(random.nextInt(groups.size()));

            String membershipKey = user.getId() + "_" + group.getId();
            if (!existingMemberships.add(membershipKey)) {
                continue;
            }

            GroupMembership groupMembership = new GroupMembership();
            groupMembership.setId(new GroupMembershipId(generateId(), roles[random.nextInt(roles.length)]));
            groupMembership.setJoined_at(joinedAt);
            groupMembership.setUser_id(user);
            groupMembership.setGroup_id(group);

            groupMemberships.add(groupMembership);
        }

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        LOG.info("size groupMembership: " + groupMemberships.size() + " duration: " +duration);
        groupMembershipRepository.saveAll(groupMemberships);
    }

    @Transactional
    public void generateFakeMessage(int number) {
        long startTime = System.currentTimeMillis();
        LOG.info("START--message");

        Set<Message> messages = new HashSet<>(number);
        MessageEnum[] messageEnums = MessageEnum.values();
        ThreadLocalRandom random = ThreadLocalRandom.current();

        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            LOG.warn("No users available for message generation.");
            return;
        }

        List<Post> allPosts = new ArrayList<>(postRepository.findAll());
        List<Story> allStories = new ArrayList<>(storyRepository.findAll());
        Map<String, List<User>> followersByUser = users.stream().collect(Collectors.toMap(User::getId, user -> followerRepository.findUsers(user.getName(), FollowerStatusEnum.ACCEPTED)));

        while (messages.size() < number) {
            User sender;
            List<User> potentialRecipients;

            do {
                sender = users.get(random.nextInt(users.size()));
                potentialRecipients = followersByUser.getOrDefault(sender.getId(), Collections.emptyList());
            } while (potentialRecipients.isEmpty());

            User recipient = potentialRecipients.get(random.nextInt(potentialRecipients.size()));

            MessagesId messagesId = new MessagesId(generateId(), messageEnums[random.nextInt(messageEnums.length)]);
            LocalDateTime date = this.getDate(10, 30).atStartOfDay();

            Message message = new Message();
            message.setId(messagesId);
            message.setContent(faker.lorem().paragraph(1));
            message.setCreated_at(date);
            message.setUpdated_at(date);
            message.setSender_id(sender);
            message.setRecipient_id(recipient);

            switch (messagesId.getType()) {
                case TEXT, IMAGE, FILE -> {
                    continue;
                }
                case POST -> {
                    if (!allPosts.isEmpty()) {
                        message.setPost_id(allPosts.get(random.nextInt(allPosts.size())));
                    }
                }
                case STORY -> {
                    if (!allStories.isEmpty()) {
                        message.setStory_id(allStories.get(random.nextInt(allStories.size())));
                    }
                }
            }
            messages.add(message);
        }

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        LOG.info("size message: " + messages.size() + " duration: " +duration);
        messageRepository.saveAll(messages);
    }

    @Transactional
    public void generateFakeMessageReadStatus(int number) {
        long startTime = System.currentTimeMillis();
        LOG.info("START--message read status");

        Set<MessageReadStatus> messageReadStatuses = new HashSet<>(number);
        List<Message> messages = messageRepository.findAll();
        for (int i = 0; i < number; i++) {
            MessageReadStatus message = new MessageReadStatus();
            message.setId(generateId());
            message.setIs_read(faker.random().nextBoolean());
            message.setRead_at(this.getDate(10, 30).atStartOfDay());

            Message m = messages.get(random.nextInt(messages.size()));
            message.setMessage_id(m);
            message.setUser_id(faker.random().nextBoolean() ? m.getRecipient_id() : m.getSender_id());

            messageReadStatuses.add(message);
        }

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        LOG.info("size message read status: " + messageReadStatuses.size() + " duration: " +duration);
        messageReadStatusRepository.saveAll(messageReadStatuses);
    }

    @Transactional
    public void generateFakeHobby(int number) {
        long startTime = System.currentTimeMillis();
        LOG.info("START--hobby");

        Set<Hobby> hobbies = new HashSet<>(number);
        for (int i = 0; i < number; i++) {
            Hobby hobby = new Hobby();
            hobby.setId(generateId());
            hobby.setName(faker.funnyName().name());
            hobby.setDescription(faker.lorem().sentence());

            hobbies.add(hobby);
        }

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        LOG.info("size hobbie: " + hobbies.size() + " duration: " +duration);
        hobbyRepository.saveAll(hobbies);
    }

    @Transactional
    public void generateFakeTravelDestination(int number) {
        long startTime = System.currentTimeMillis();
        LOG.info("START--travel destination");

        Set<TravelDestination> travelDestinations = new HashSet<>(number);
        for (int i = 0; i < number; i++) {
            TravelDestination travelDestination = new TravelDestination();
            travelDestination.setId(generateId());
            travelDestination.setName(faker.funnyName().name());
            travelDestination.setCountry(faker.country().name());
            travelDestination.setDescription(faker.lorem().sentence());

            travelDestinations.add(travelDestination);
        }
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        LOG.info("size travel destination: " + travelDestinations.size() + " duration: " +duration);
        travelDestionationRepository.saveAll(travelDestinations);
    }

    @Transactional
    public void generateFakeJournal(int number) {
        long startTime = System.currentTimeMillis();
        LOG.info("START--journal");

        ThreadLocalRandom random = ThreadLocalRandom.current();
        Set<Journal> journals = new HashSet<>(number);

        List<User> users = userRepository.findAll();
        List<Hobby> hobbies = hobbyRepository.findAll();
        List<TravelDestination> travelDestinations = travelDestionationRepository.findAll();
        if (users.isEmpty()) {
            LOG.warn("No users found. Skipping journal generation.");
            return;
        }

        for (int i = 0; i < number; i++) {
            User user = users.get(random.nextInt(users.size()));
            int hobbyCount = Math.min(6, hobbies.size());
            int travelCount = Math.min(6, travelDestinations.size());

            List<Hobby> selectHobby = getRandomSubset(hobbies, random, hobbyCount);
            List<TravelDestination> selectTravelDestination = getRandomSubset(travelDestinations, random, travelCount);

            LocalDateTime date = this.getDate(10, 30).atStartOfDay();

            Journal journal = new Journal();
            journal.setId(generateId());
            journal.setTittle(faker.dune().title());
            journal.setContent(faker.lorem().sentence());
            journal.setCreate_at(date);
            journal.setUpdate_at(date);
            journal.setUser_id(user);
            journal.setHobby_ids(selectHobby);
            journal.setTravel_destination_ids(selectTravelDestination);

            journals.add(journal);
        }


        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        LOG.info("size journal: " + journals.size() + " duration: " +duration);
        journalRepository.saveAll(journals);
    }

    public String generateId() {
        return String.valueOf(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE);
    }

    private <T> List<T> getRandomSubset(List<T> list, Random random, int maxSize) {
        if (list.isEmpty()) return Collections.emptyList();
        Collections.shuffle(list);
        int subsetSize = Math.min(random.nextInt(maxSize + 1), list.size());
        if (subsetSize == 0) subsetSize = 1;
        return list.subList(0, subsetSize);
    }


    private LocalDate getDate(int start, int end) {
        return faker.date().birthday(10, 20).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    private List<Media> getMediaForPostType(PostEnum type, List<Media> mediaList) {
        if (mediaList.isEmpty()) return Collections.emptyList();

        switch (type) {
            case TEXT:
                return null;

            case REEL:
                return mediaList.stream().filter(media -> media.getId().getType() == MediaEnum.VIDEO).limit(1).collect(Collectors.toList());

            case POST:
                return getRandomSubset(mediaList, new Random(), 6);

            default:
                return null;
        }
    }

    private String getRandomUserIdWithContentMedia(Map<String, List<Media>> mediaByUser) {
        List<String> usersWithContent = new ArrayList<>(mediaByUser.keySet());
        if (!usersWithContent.isEmpty()) {
            return usersWithContent.get(ThreadLocalRandom.current().nextInt(usersWithContent.size()));
        } else {
            return null;
        }
    }

    private String getRandomUserIdWithContentPost(Map<String, List<Post>> postByUser) {
        List<String> usersWithContent = new ArrayList<>(postByUser.keySet());
        if (!usersWithContent.isEmpty()) {
            return usersWithContent.get(ThreadLocalRandom.current().nextInt(usersWithContent.size()));
        } else {
            return null;
        }
    }

    private String getRandomUserIdWithContentStory(Map<String, List<Story>> storyByUser) {
        List<String> usersWithContent = new ArrayList<>(storyByUser.keySet());
        if (!usersWithContent.isEmpty()) {
            return usersWithContent.get(ThreadLocalRandom.current().nextInt(usersWithContent.size()));
        } else {
            return null;
        }
    }

    private String getRandomUserIdWithContentBasedOnType(Map<String, List<Media>> mediaByUser,
                                                         Map<String, List<Post>> postByUser,
                                                         Map<String, List<Story>> storyByUser,
                                                         ShareEnum randomType) {
        switch (randomType) {
            case MEDIA:
                return getRandomUserIdWithContentMedia(mediaByUser);
            case POST:
                return getRandomUserIdWithContentPost(postByUser);
            case STORY:
                return getRandomUserIdWithContentStory(storyByUser);
            default:
                return null;
        }
    }

}