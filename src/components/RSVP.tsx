import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Users, Calendar, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

type Attendance = 'yes' | 'no' | null;
type Event = 'haldi' | 'nikah' | 'reception';

interface RSVPData {
  name: string;
  phone: string;
  numberOfGuests: number;
  attendance: Attendance;
  events: {
    [key in Event]: boolean;
  };
  dietaryRestrictions: string;
  submitted: boolean;
}

export default function RSVP() {
  const [formData, setFormData] = useState<RSVPData>({
    name: '',
    phone: '',
    numberOfGuests: 1,
    attendance: null,
    events: {
      haldi: false,
      nikah: false,
      reception: false
    },
    dietaryRestrictions: '',
    submitted: false
  });

  const handleAttendanceClick = (value: Attendance) => {
    setFormData(prev => ({
      ...prev,
      attendance: value
    }));
  };

  const handleEventToggle = (event: Event) => {
    setFormData(prev => ({
      ...prev,
      events: {
        ...prev.events,
        [event]: !prev.events[event]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare the email content
      const emailContent = `
        New RSVP Submission:
        
        Name: ${formData.name}
        Phone: ${formData.phone}
        Attendance: ${formData.attendance}
        Number of Guests: ${formData.numberOfGuests}
        
        Events Attending:
        - Haldi & Mehndi: ${formData.events.haldi ? 'Yes' : 'No'}
        - Nikah Ceremony: ${formData.events.nikah ? 'Yes' : 'No'}
        - Reception: ${formData.events.reception ? 'Yes' : 'No'}
        
        Dietary Restrictions: ${formData.dietaryRestrictions || 'None'}
      `;

      // Send email using EmailJS or similar service
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: 'hashkigu@gmail.com',
          from_name: formData.name,
          message: emailContent,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      if (!response.ok) {
        throw new Error('Failed to send RSVP');
      }

      // Update state to show success message
      setFormData(prev => ({ ...prev, submitted: true }));
      
    } catch (error) {
      console.error('Error sending RSVP:', error);
      alert('Failed to send RSVP. Please try again later.');
    }
  };

  if (formData.submitted) {
    return (
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-rose-50 p-8 rounded-lg shadow-lg text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-dancing text-[#c17f59] mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your RSVP has been received. We're looking forward to celebrating with you!
          </p>
          <button
            onClick={() => setFormData(prev => ({ ...prev, submitted: false }))}
            className="text-[#c17f59] hover:text-[#c17f59]/80"
          >
            Submit another response
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-dancing text-[#c17f59] mb-4">RSVP</h2>
          <p className="text-gray-600">Please let us know if you'll be joining us for the celebration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c17f59] focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c17f59] focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Attendance Buttons */}
          <div>
            <label className="block text-gray-700 mb-4">Will you be attending?</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleAttendanceClick('yes')}
                className={`flex-1 p-4 rounded-lg border ${
                  formData.attendance === 'yes'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Check className="w-6 h-6 mx-auto mb-2" />
                Joyfully Accept
              </button>
              <button
                type="button"
                onClick={() => handleAttendanceClick('no')}
                className={`flex-1 p-4 rounded-lg border ${
                  formData.attendance === 'no'
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <X className="w-6 h-6 mx-auto mb-2" />
                Regretfully Decline
              </button>
            </div>
          </div>

          {formData.attendance === 'yes' && (
            <>
              {/* Number of Guests */}
              <div>
                <label className="block text-gray-700 mb-2">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.numberOfGuests}
                    onChange={e => setFormData(prev => ({ ...prev, numberOfGuests: parseInt(e.target.value) }))}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c17f59] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Events Selection */}
              <div>
                <label className="block text-gray-700 mb-4">Which events will you attend?</label>
                <div className="space-y-3">
                  {[
                    { id: 'haldi', label: 'Haldi & Mehndi' },
                    { id: 'nikah', label: 'Nikah Ceremony' },
                    { id: 'reception', label: 'Reception' }
                  ].map(event => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => handleEventToggle(event.id as Event)}
                      className={`w-full p-4 rounded-lg border flex items-center justify-between ${
                        formData.events[event.id as Event]
                          ? 'bg-[#c17f59]/10 border-[#c17f59] text-[#c17f59]'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span>{event.label}</span>
                      {formData.events[event.id as Event] && <Check className="w-5 h-5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-gray-700 mb-2">Dietary Restrictions (if any)</label>
                <textarea
                  value={formData.dietaryRestrictions}
                  onChange={e => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c17f59] focus:border-transparent"
                  rows={3}
                  placeholder="Please let us know if you have any dietary restrictions"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#c17f59] text-white py-4 rounded-lg hover:bg-[#c17f59]/90 transition-colors"
          >
            Submit RSVP
          </button>
        </form>
      </div>
    </div>
  );
}