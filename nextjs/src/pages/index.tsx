import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PageHead } from '@/components/seo/PageHead';
import useTranslation from 'next-translate/useTranslation';
import BlankLayout from '@/layouts/BlankLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Timeout = ReturnType<typeof setTimeout>;

interface Website {
  url: string;
  status: string;
  isMonitoring: boolean;
}

function HomePage() {
  const { t } = useTranslation('home');
  const [websites, setWebsites] = useState<Website[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [checkInterval, setCheckInterval] = useState(100);
  const [logs, setLogs] = useState<string>('');

  const intervalsRef = useRef<{ [url: string]: Timeout }>({});

  function addLog(message: string) {
    setLogs((prevLogs) => `${prevLogs}${new Date().toISOString()}: ${message}\n`);
  }

  useEffect(() => {
    const intervals = intervalsRef.current;
    return () => Object.values(intervals).forEach(clearInterval);
  }, []);

  async function checkWebsite(url: string) {
    try {
      addLog(`Checking website: ${url}`);

      const response = await axios.post('/api/check-website', { url });
      const { hasChanged, status } = response.data;

      setWebsites((prevWebsites) =>
        prevWebsites.map((website) =>
          website.url === url
            ? { ...website, status: hasChanged ? 'Changed detected!' : status }
            : website,
        ),
      );

      addLog(hasChanged ? `Change detected for ${url}` : `No change detected for ${url}`);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : 'An unknown error occurred';

      setWebsites((prevWebsites) =>
        prevWebsites.map((website) =>
          website.url === url ? { ...website, status: `Error: ${errorMessage}` } : website,
        ),
      );

      addLog(`Error checking ${url}: ${errorMessage}`);
      console.error('Error:', error);
    }
  }

  function startMonitoring(url: string) {
    addLog(`Starting monitoring for ${url}`);
    setWebsites((prevWebsites) =>
      prevWebsites.map((website) =>
        website.url === url ? { ...website, isMonitoring: true } : website,
      ),
    );
    intervalsRef.current[url] = setInterval(() => checkWebsite(url), checkInterval);
  }

  function stopMonitoring(url: string) {
    addLog(`Stopping monitoring for ${url}`);
    setWebsites((prevWebsites) =>
      prevWebsites.map((website) =>
        website.url === url ? { ...website, isMonitoring: false } : website,
      ),
    );
    if (intervalsRef.current[url]) {
      clearInterval(intervalsRef.current[url]);
      delete intervalsRef.current[url];
    }
  }

  function addWebsite() {
    if (newUrl && !websites.some((website) => website.url === newUrl)) {
      setWebsites([...websites, { url: newUrl, status: 'Not monitoring', isMonitoring: false }]);
      setNewUrl('');
    }
  }

  function clearLogs() {
    setLogs('');
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-8">
      <PageHead pageTitle={t('page_title')} />

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Fei Fei Booking System
      </h1>

      <div className="lg:flex lg:gap-8">
        <div className="lg:w-2/3 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Website Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Enter URL to monitor"
                    className="flex-grow"
                  />
                  <Button onClick={addWebsite} className="w-full sm:w-auto">
                    Add Website
                  </Button>
                </div>
                <div>
                  <label className="block mb-2">
                    Check Interval (milliseconds): {checkInterval}
                  </label>
                  <Slider
                    value={[checkInterval]}
                    onValueChange={(value) => setCheckInterval(value[0])}
                    min={50}
                    max={5000}
                    step={50}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monitored Websites</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {websites.map((website) => (
                    <TableRow key={website.url}>
                      <TableCell className="break-all">{website.url}</TableCell>
                      <TableCell>{website.status}</TableCell>
                      <TableCell>
                        {website.isMonitoring ? (
                          <Button onClick={() => stopMonitoring(website.url)} variant="destructive">
                            Stop Monitoring
                          </Button>
                        ) : (
                          <Button onClick={() => startMonitoring(website.url)} variant="outline">
                            Start Monitoring
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 lg:mt-0 lg:w-1/3">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>System Logs</CardTitle>
              <Button onClick={clearLogs} variant="outline" size="sm">
                Clear Logs
              </Button>
            </CardHeader>
            <CardContent className="flex-grow">
              <Textarea
                value={logs}
                readOnly
                className="h-full min-h-[300px] resize-vertical"
                placeholder="Logs will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

HomePage.getLayout = BlankLayout;

export default HomePage;
