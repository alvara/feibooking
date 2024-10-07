import { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Locate } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Location {
  country: string;
  city: string;
}

function LocationSwitcherButton() {
  const { t } = useTranslation('common');

  const [location, setLocation] = useState<Location>({ country: 'japan', city: 'tokyo' });
  const [country, setCountry] = useState('japan');
  const [city, setCity] = useState('tokyo');
  const [newCountry, setNewCountry] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [selectedCity, setSelectedCity] = useState(city);
  const [isLoading, setIsLoading] = useState(false);

  const supportedLocations = [
    {
      id: 'japan',
      cities: [{ id: 'tokyo', label: 'location.cities.tokyo' }],
      label: 'location.countries.japan',
    },
    {
      id: 'thailand',
      cities: [{ id: 'bangkok', label: 'location.cities.bangkok' }],
      label: 'location.countries.thailand',
    },
  ];

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      const [storedCountry, storedCity] = JSON.parse(storedLocation);
      if (isValidLocation(storedCountry, storedCity)) {
        setLocation({ country: storedCountry, city: storedCity });
        setCountry(storedCountry);
        setCity(storedCity);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function isValidLocation(country: string, city: string): boolean {
    return supportedLocations.some(
      (loc) => loc.id === country && loc.cities.some((c) => c.id === city),
    );
  }

  function handleLocationChange(newCountry: string, newCity?: string) {
    const selectedCountry = supportedLocations.find((loc) => loc.id === newCountry);
    if (selectedCountry) {
      const validCity =
        newCity && selectedCountry.cities.some((c) => c.id === newCity)
          ? newCity
          : selectedCountry.cities[0].id;

      const locationObj = { country: newCountry, city: validCity };
      setLocation(locationObj);
      setCountry(newCountry);
      setCity(validCity);
      localStorage.setItem('userLocation', JSON.stringify([newCountry, validCity]));
      setIsDialogOpen(false);
    }
  }

  function handleUseDeviceLocation() {
    setIsLoading(true);
    // Simulate geolocation API call
    setTimeout(() => {
      handleLocationChange('japan', 'tokyo');
      setIsLoading(false);
    }, 1000);
  }

  function handleSubmitNewCountry(e: React.FormEvent) {
    e.preventDefault();
    console.log('New country request:', newCountry);
    setNewCountry('');
    setIsDialogOpen(false);
  }

  function handleCountryChange(newCountry: string) {
    setSelectedCountry(newCountry);
    setSelectedCity('');
  }

  function handleCityChange(newCity: string) {
    setSelectedCity(newCity);
  }

  function handleApplyLocation() {
    if (selectedCountry && selectedCity) {
      setLocation({ country: selectedCountry, city: selectedCity });
      setCountry(selectedCountry);
      setCity(selectedCity);
      localStorage.setItem('userLocation', JSON.stringify([selectedCountry, selectedCity]));
      setIsDialogOpen(false);
    }
  }

  function displayLocation() {
    if (!location) return t('location.select');
    const countryName = t(`location.countries.${location.country}`);
    const cityName = t(`location.cities.${location.city}`);
    return (
      <>
        <span className="hidden sm:inline">{`${countryName}, ${cityName}`}</span>
        <span className="sm:hidden">{cityName || countryName}</span>
      </>
    );
  }

  return (
    <>
      <Button variant="outline" className="font-sans" onClick={() => setIsDialogOpen(true)}>
        <MapPin className="mr-2 h-4 w-4" />
        {displayLocation()}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('location.title')}</DialogTitle>
            <DialogDescription>{t('location.description')}</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="existing">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing">{t('location.existingLocations')}</TabsTrigger>
              <TabsTrigger value="new">{t('location.requestNew')}</TabsTrigger>
            </TabsList>
            <TabsContent value="existing">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    {t('location.country')}
                  </Label>
                  <Select onValueChange={handleCountryChange} value={selectedCountry}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={t('location.selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedLocations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {t(loc.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    {t('location.city')}
                  </Label>
                  <Select
                    onValueChange={handleCityChange}
                    value={selectedCity}
                    disabled={!selectedCountry}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={t('location.selectCity')} />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedLocations
                        .find((loc) => loc.id === selectedCountry)
                        ?.cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {t(`location.cities.${city.id}`)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    onClick={handleApplyLocation}
                    disabled={!selectedCountry || !selectedCity}
                  >
                    {t('location.applyLocation')}
                  </Button>
                  <Button onClick={handleUseDeviceLocation} variant="outline" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <Locate className="mr-2 h-4 w-4 animate-spin" />
                        {t('location.locating')}
                      </span>
                    ) : (
                      <>
                        <Locate className="mr-2 h-4 w-4" />
                        {t('location.useDevice')}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="new">
              <form onSubmit={handleSubmitNewCountry} className="mt-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newCountry" className="text-right">
                    {t('location.newCountry')}
                  </Label>
                  <Input
                    id="newCountry"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="col-span-3"
                    placeholder={t('location.enterNewCountry')}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">{t('location.newCountryDescription')}</p>
                <Button type="submit" className="mt-4" disabled={!newCountry.trim()}>
                  {t('location.submitNewCountry')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LocationSwitcherButton;
