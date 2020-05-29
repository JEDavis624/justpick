import axios from 'axios';

export default {
    createAccount: function(user) {
        return axios.post('/api/signup', user);
    },

    login: function(user) {
        return axios.post('/api/login', user);
    },

    logout: function() {
        return axios.get('/api/logout');
    },

    update: function(updates) {
        return axios.post('/api/profile', updates);
    },

    // update: function() {
    //     return axios.post('/api/about');
    // },
    
    getAllPros: function() {
        return axios.get('/api/pros')
    },

    getAppointmentsByUserId: function(id) {
        return axios.get(`/api/pros/${id.toString()}/appointments`);
    },

    createAppointment: function(instructor, time) {
        const data = { instructor, time };
        console.log(data);
        return axios.post(`/api/appt`, data);
    },

    getAvailability: function() {
        return axios.get('/api/availability');
    },

    getReviewAuth: function(instructorId) {
        return axios.post('/api/review/auth', { instructorId });
    },

    createReview: function(instructorId, score) {
        return axios.post('/api/review', { instructorId, score });
    }
};

