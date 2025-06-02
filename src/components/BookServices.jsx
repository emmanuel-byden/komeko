import Header from './Header';
import '../index.css'; // Ensure you have the correct path to your CSS file
import React, { useState } from 'react';

export default function BookService() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        date: '',
        guests: 1,
        specialRequests: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://komeko-backend.onrender.com/bookings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert(`Booking created successfully with ID: ${data.id}`);
            // Optionally reset the form
            setFormData({
                name: '',
                email: '',
                phone: '',
                eventType: '',
                date: '',
                guests: 1,
                specialRequests: ''
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create booking. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <section className="bg-gray-50 py-16 px-6 min-h-screen flex items-center justify-center">
                <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Book a Catering Service</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Event Type</label>
                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="">Select Event Type</option>
                                <option>Wedding</option>
                                <option>Birthday</option>
                                <option>Corporate</option>
                                <option>Private Party</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                                <input
                                    type="number"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                            <textarea
                                name="specialRequests"
                                rows="4"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                                placeholder="Let us know anything important..."
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Submit Bookings
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}