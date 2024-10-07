import { useRouter } from 'next/router';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserIcon, CalendarIcon, ArrowLeftIcon } from 'lucide-react';
import { PageHead } from '@/components/seo/PageHead';
import Link from 'next/link';
import { useGetCommunities } from '@/api/payload-client/communities';

function CommunityDetailPage() {
  const router = useRouter();
  const { communityId } = router.query;

  const {
    data: communityData,
    isLoading,
    isError,
  } = useGetCommunities(
    {
      where: {
        slug: {
          equals: communityId as string,
        },
      },
      depth: 2,
      limit: 1,
    },
    {
      query: {
        enabled: !!communityId,
      },
    },
  );

  const community = communityData?.data?.docs[0];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <PageHead pageTitle="Loading Community..." />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !community) {
    return (
      <div className="min-h-screen">
        <PageHead pageTitle="Error Loading Community" />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error loading community</h1>
            <p>There was an error loading the community data. Please try again later.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHead pageTitle={`${community.communityName} Community`} />
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/community"
          className="flex items-center mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Communities
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <Avatar className="w-24 h-24">
            {/* <AvatarImage
              src={
                community.logo?.url ||
                `https://api.dicebear.com/6.x/initials/svg?seed=${community.name}`
              }
              alt={community.communityName}
            /> */}
            <AvatarFallback>{community.communityName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{community.communityName}</h1>
            <p className="text-xl text-muted-foreground">{community.communitySummary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="w-full">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {community.communityName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <UserIcon className="w-5 h-5" />
                      <span>{community.communityMembers?.length} members</span>
                    </div>
                    {/* <div className="flex items-center gap-2 mb-4">
                      <MapPinIcon className="w-5 h-5" />
                      <span>{community.location}</span>
                    </div> */}
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="w-5 h-5" />
                      <span>Founded in {new Date(community.createdAt).getFullYear()}</span>
                    </div>
                    {/* <div className="flex flex-wrap gap-2 mb-4">
                      {community.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div> */}
                    <p className="mt-4">{community.communityLongDescription}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {community.events?.map((event, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors"
                        >
                          <span className="font-medium">{event.title}</span>
                          <span className="text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent> */}
              {/* <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Admins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {community.admins?.map((admin, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition-colors"
                        >
                          <Avatar>
                            <AvatarImage
                              src={
                                admin.avatar?.url ||
                                `https://api.dicebear.com/6.x/initials/svg?seed=${admin.name}`
                              }
                              alt={admin.name}
                            />
                            <AvatarFallback>{admin.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{admin.name}</p>
                            <p className="text-sm text-muted-foreground">{admin.role}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent> */}
              {/* <TabsContent value="photos">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {community.photos?.map((photo, index) => (
                        <div key={index} className="relative aspect-square group cursor-pointer">
                          <Image
                            src={photo.url}
                            alt={photo.alt || ''}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md transition-opacity group-hover:opacity-75"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white bg-black bg-opacity-50 p-2 rounded">
                              {photo.alt || ''}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>

          <div>
            {community.subcommunities && community.subcommunities.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Subcommunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {community.subcommunities.map((subcommunity, index) => (
                      <li key={index}>
                        <Button variant="link" className="p-0">
                          {JSON.stringify(subcommunity)}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            <Button className="w-full mb-4">Join Community</Button>
            <Button variant="outline" className="w-full">
              Contact Admin
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CommunityDetailPage;
