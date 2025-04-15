import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, UserRound, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DoctorsList = ({ doctors, onSelectDoctor, selectedDoctorId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.specialization && doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="flex flex-col h-full border-0 shadow-none">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search doctors by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 input-focus-effect"
          />
        </div>

        <ScrollArea className="h-[calc(100vh-180px)]">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <UserRound className="mx-auto h-12 w-12 mb-2 text-gray-400" />
              <p>No doctors matching your search criteria</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDoctors.map((doctor) => (
                <Button
                  key={doctor.id}
                  variant="ghost"
                  className={`w-full justify-start p-3 h-auto ${
                    selectedDoctorId === doctor.id ? 'bg-teal-50' : ''
                  }`}
                  onClick={() => onSelectDoctor(doctor)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="bg-teal-100 rounded-full p-2">
                      <UserRound className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="text-left flex-grow">
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-sm text-gray-500">{doctor.specialization}</div>
                    </div>
                    <div>
                      {doctor.availability ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> Away
                        </Badge>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DoctorsList;
