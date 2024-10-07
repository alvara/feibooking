import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { UserIcon, CalendarIcon } from 'lucide-react';
import { useGetCommunities } from '@/api/payload-client/communities';
import type { Communities } from '@/api/payload-client/model/communities';
import type { Events } from '@/api/payload-client/model/events';
import { Input } from '@/components/ui/input';

function CommunityPage() {
  const {
    data: communitiesData,
    isLoading,
    error,
  } = useGetCommunities({
    depth: 2,
  });

  const communityCategoryCards = [
    {
      title: 'Free',
      href: '/community/category/mental-health',
      color: 'from-teal-500 to-cyan-500',
      emoji: '🆓',
    },
    {
      title: 'Running',
      href: '/community/category/running',
      color: 'from-blue-500 to-cyan-500',
      emoji: '🏃‍♂️',
    },
    {
      title: 'Outdoor',
      href: '/community/category/outdoor',
      color: 'from-green-500 to-emerald-500',
      emoji: '🏞️',
    },
    {
      title: 'Beginner Friendly',
      href: '/community/category/beginner',
      color: 'from-purple-500 to-pink-500',
      emoji: '🌱',
    },
    {
      title: 'Advanced',
      href: '/community/category/advanced',
      color: 'from-orange-500 to-yellow-500',
      emoji: '🏆',
    },
    {
      title: 'Yoga & Pilates',
      href: '/community/category/yoga',
      color: 'from-red-500 to-pink-500',
      emoji: '🧘‍♀️',
    },
    {
      title: 'Competition Training',
      href: '/community/category/competition',
      color: 'from-indigo-500 to-blue-500',
      emoji: '🏅',
    },
    {
      title: 'Personal Coaching',
      href: '/community/category/coaching',
      color: 'from-yellow-500 to-green-500',
      emoji: '🏋️‍♀️',
    },
  ];

  function CommunityCategoryCards() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {communityCategoryCards.map((category) => (
          <Link href={category.href} key={category.title} passHref>
            <Card
              className={`bg-gradient-to-br ${category.color} hover:opacity-80 transition-opacity cursor-pointer h-32`}
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-2">
                <span className="text-3xl mb-2">{category.emoji}</span>
                <CardTitle className="text-white text-center">{category.title}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  function CommunityList() {
    if (isLoading) {
      return <div>Loading communities...</div>;
    }

    if (error) {
      return <div>Error loading communities: {error.message}</div>;
    }

    const communities: (Communities & { communityEvents?: Events[] })[] =
      communitiesData?.data?.docs.map((community) => ({
        ...community,
        // communityEvents:
        //   community.communityEvents?.filter((event): event is Events => event !== null) ||
        //   undefined,
      })) || [];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <Card key={community.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/community/${community.slug}`} className="cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4 mb-2">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${community?.communityName || ''}`}
                      alt={community.communityName}
                    />
                    <AvatarFallback>{community?.communityName?.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-bold hover:underline">
                    {community.communityName}
                  </CardTitle>
                </div>
                <CardDescription>{community.communityLongDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                {community.communityMembers && (
                  <div className="flex items-center gap-2 mb-2">
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">
                      {community.communityMembers.length} members
                    </span>
                  </div>
                )}
                {/* {community.communityTags && community.communityTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {community.communityTags.map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.item}
                      </Badge>
                    ))}
                  </div>
                )} */}
                {community.communityEvents && community.communityEvents.length > 0 && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Next event: {community.communityEvents[0].eventTitle || 'No upcoming event'}
                    </span>
                  </div>
                )}
                {/* {community.communityLocation && community.communityLocation.length > 0 && (
                  <div className="text-sm text-muted-foreground mt-2">
                    Location: {community.communityLocation[0].googleMapsUrl || 'No location'}
                  </div>
                )} */}
                {/* {community.communityYearFounded && (
                  <div className="text-sm text-muted-foreground">
                    Founded: {community.communityYearFounded}
                  </div>
                )} */}
                {/* {community.subcommunities && community.subcommunities.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold mb-1">Subcommunities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {community.subcommunities.map((subcommunity) => (
                        <Badge key={subcommunity.id} variant="outline" className="text-xs">
                          {subcommunity.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Link>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">View Details</Button>
              <Button>Follow</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  function MembersSection() {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Top Achievers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${i}`} />
                      <AvatarFallback>M{i}</AvatarFallback>
                    </Avatar>
                    Member {i}
                  </CardTitle>
                  <CardDescription>Achievement Unlocked</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Reached a significant milestone in fitness journey</p>
                  <Button variant="outline">View Profile</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Filter Members</h2>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Switch checked={datingMode} onCheckedChange={setDatingMode} id="dating-mode" />
              <label htmlFor="dating-mode">Show Dating Profiles</label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={hyroxMode} onCheckedChange={setHyroxMode} id="hyrox-mode" />
              <label htmlFor="hyrox-mode">Show Hyrox Groups</label>
            </div>
          </div>
        </div> */}

        <Input type="text" placeholder="Search members..." className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex justify-center">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${i + 10}`}
                    />
                    <AvatarFallback>M{i}</AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="font-semibold text-lg mb-1">Member {i}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Fitness enthusiast | Yoga lover
                </p>
                <p className="text-sm mb-4">
                  Passionate about health and wellness. Always up for a new challenge!
                </p>
                {/* {datingMode && (
                  <Badge variant="secondary" className="mr-2">
                    Dating
                  </Badge>
                )}
                {hyroxMode && <Badge variant="secondary">Hyrox</Badge>} */}
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  function CommunityNews() {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Image
              src={`https://picsum.photos/seed/${i + 20}/800/400`}
              alt={`News ${i} banner`}
              width={800}
              height={400}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>Community News {i}</CardTitle>
              <CardDescription>Latest updates from our community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  function ConversationsList() {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Discussion Topic {i}</CardTitle>
                <Badge variant="outline">{Math.floor(Math.random() * 50) + 1} replies</Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${i + 30}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
                Started by User{i} • {Math.floor(Math.random() * 24) + 1}h ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Latest reply: Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Join Discussion</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Community</h1>

      <div className="mb-8">
        <Tabs defaultValue="communities" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="communities">
              <CommunityCategoryCards />
              <CommunityList />
            </TabsContent>
            <TabsContent value="members">
              <MembersSection />
            </TabsContent>
            <TabsContent value="news">
              <CommunityNews />
            </TabsContent>
            <TabsContent value="conversations">
              <ConversationsList />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default CommunityPage;
