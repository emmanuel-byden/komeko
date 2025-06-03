import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Header from './Header';
import '../index.css'; // Ensure you have the correct path to your CSS file

const BookService = () => {
    const [user, setUser] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        event_type: '',
        event_date: '',
        guests: 1,
        special_requests: '',
    });
    const [bookingId, setBookingId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), setUser);
        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                const response = await axios.post('https://komeko-backend.onrender.com/bookings/', {
                    ...bookingDetails,
                    email: user.email,
                });
                setBookingId(response.data.id);
                setMessage('Booking created successfully!');
                setBookingDetails({
                    name: '',
                    email: '',
                    phone: '',
                    event_type: '',
                    event_date: '',
                    guests: 1,
                    special_requests: '',
                });
            } catch (error) {
                setMessage('Error creating booking: ' + error.response.data.detail);
            }
        } else {
            setMessage('Please log in to create a booking.');
        }
    };

    const fetchBooking = async () => {
        if (bookingId) {
            try {
                const response = await axios.get(`https://komeko-backend.onrender.com/bookings/${bookingId}`);
                console.log('Booking details:', response.data);
                setMessage('Booking details fetched successfully!');
            } catch (error) {
                setMessage('Error fetching booking: ' + error.response.data.detail);
            }
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
                                value={bookingDetails.name}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={bookingDetails.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={bookingDetails.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Event Type</label>
                            <select
                                name="event_type"
                                value={bookingDetails.event_type}
                                onChange={handleInputChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
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
                                    name="event_date"
                                    value={bookingDetails.event_date}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                                <input
                                    type="number"
                                    name="guests"
                                    value={bookingDetails.guests}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                            <textarea
                                name="special_requests"
                                rows="4"
                                value={bookingDetails.special_requests}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                                placeholder="Let us know anything important..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Submit Booking
                        </button>
                    </form>
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                    <button onClick={fetchBooking} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Fetch Booking Details
                    </button>
                </div>
            </section>
        </>
    );
};

export default BookService;