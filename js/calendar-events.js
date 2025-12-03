// calendar-events.js - FINAL VERSION - Google Calendar Integration
document.addEventListener('DOMContentLoaded', function() {
    console.log('QCFI Calendar Integration - FINAL');
    
    // ===== CONFIGURATION =====
    const CONFIG = {
        API_KEY: '',
        CALENDAR_ID: '',
        MAX_EVENTS: 20, // How many events to fetch
        DAYS_IN_FUTURE: 365, // How far in future to look (1 year)
        DAYS_IN_PAST: 90 // How far in past to look (3 months)
    };
    // ===== END CONFIGURATION =====
    
    // DOM Elements
    const eventsGrid = document.getElementById('eventsGrid');
    const loadingState = document.getElementById('loadingState');
    const noEventsState = document.getElementById('noEventsState');
    const pastEventsGrid = document.getElementById('pastEventsGrid');
    const pastEventsLoading = document.getElementById('pastEventsLoading');
    const noPastEvents = document.getElementById('noPastEvents');
    
    // Show loading states
    showLoadingState();
    
    // Start loading events
    setTimeout(() => {
        loadCalendarData();
    }, 300);
    
    async function loadCalendarData() {
        console.log('=== Loading Calendar Data ===');
        console.log('Calendar ID:', CONFIG.CALENDAR_ID);
        console.log('API Key:', CONFIG.API_KEY.substring(0, 10) + '...');
        
        try {
            // Fetch all events from Google Calendar
            const allEvents = await fetchAllCalendarEvents();
            
            if (!allEvents || allEvents.length === 0) {
                console.log('No events found at all');
                showNoEventsState();
                return;
            }
            
            console.log(`Total events found: ${allEvents.length}`);
            
            // Split into upcoming and past events
            const now = new Date();
            const upcomingEvents = allEvents.filter(event => !event.isPast);
            const pastEvents = allEvents.filter(event => event.isPast);
            
            console.log(`Upcoming: ${upcomingEvents.length}, Past: ${pastEvents.length}`);
            
            // Display upcoming events
            if (upcomingEvents.length > 0) {
                displayUpcomingEvents(upcomingEvents);
            } else {
                // If no upcoming events, show recent past events
                displayUpcomingEvents(pastEvents.slice(0, 3));
            }
            
            // Display past events
            displayPastEvents(pastEvents);
            
        } catch (error) {
            console.error('Failed to load calendar:', error);
            showNoEventsState();
        }
    }
    
    async function fetchAllCalendarEvents() {
        try {
            const now = new Date();
            const future = new Date();
            future.setDate(future.getDate() + CONFIG.DAYS_IN_FUTURE);
            
            const past = new Date();
            past.setDate(past.getDate() - CONFIG.DAYS_IN_PAST);
            
            // Build API URL
            const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CONFIG.CALENDAR_ID)}/events?key=${CONFIG.API_KEY}&timeMin=${past.toISOString()}&timeMax=${future.toISOString()}&singleEvents=true&orderBy=startTime&maxResults=${CONFIG.MAX_EVENTS}`;
            
            console.log('Fetching events from:', apiUrl.substring(0, 100) + '...');
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', response.status, errorText);
                throw new Error(`API Error ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.items || data.items.length === 0) {
                return [];
            }
            
            // Convert and process events
            return processGoogleEvents(data.items);
            
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }
    
    function processGoogleEvents(googleEvents) {
        const now = new Date();
        
        return googleEvents
            .map(event => {
                try {
                    const start = event.start.dateTime || event.start.date;
                    const end = event.end.dateTime || event.end.date;
                    const startDate = new Date(start);
                    const endDate = end ? new Date(end) : null;
                    
                    // Create event object
                    return {
                        id: event.id,
                        title: event.summary || 'QCFI Event',
                        description: cleanText(event.description || 'Quality Circle Forum of India Bengaluru Chapter event. Join us for quality improvement initiatives.'),
                        location: event.location || 'QCFI Bengaluru Chapter',
                        date: formatDate(startDate),
                        time: formatTime(startDate, endDate),
                        type: getEventType(event.summary, event.description),
                        calendarLink: event.htmlLink || createCalendarLink(event),
                        rawDate: startDate,
                        isPast: startDate < now,
                        rawEvent: event // Keep original for debugging
                    };
                } catch (e) {
                    console.log('Error processing event:', e);
                    return null;
                }
            })
            .filter(event => event !== null)
            .sort((a, b) => a.rawDate - b.rawDate);
    }
    
    function cleanText(text) {
        // Remove HTML tags and clean up text
        return text
            .replace(/<[^>]*>/g, ' ') // Remove HTML tags
            .replace(/\\n/g, ' ') // Replace newlines
            .replace(/\s+/g, ' ') // Collapse multiple spaces
            .trim();
    }
    
    function formatDate(date) {
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return {
            day: date.getDate(),
            month: monthNames[date.getMonth()],
            fullDate: date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            iso: date.toISOString().split('T')[0],
            raw: date
        };
    }
    
    function formatTime(start, end) {
        if (!start) return 'Time TBA';
        
        try {
            const startTime = start.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            
            if (end) {
                const endTime = end.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
                return `${startTime} - ${endTime}`;
            }
            
            return startTime;
        } catch (e) {
            return 'Time TBA';
        }
    }
    
    function getEventType(title, description) {
        if (!title) return 'Event';
        const text = (title + ' ' + (description || '')).toLowerCase();
        
        // Priority order - most specific first
        if (text.includes('kaizen') || text.includes('competition')) return 'Competition';
        if (text.includes('workshop')) return 'Workshop';
        if (text.includes('training')) return 'Training';
        if (text.includes('convention') || text.includes('conference')) return 'Convention';
        if (text.includes('seminar')) return 'Seminar';
        if (text.includes('webinar')) return 'Webinar';
        if (text.includes('meet') || text.includes('network')) return 'Networking';
        if (text.includes('meeting') || text.includes('agm')) return 'Meeting';
        if (text.includes('forum')) return 'Forum';
        if (text.includes('summit')) return 'Summit';
        return 'Event';
    }
    
    function createCalendarLink(event) {
        try {
            const start = event.start.dateTime || event.start.date;
            const end = event.end.dateTime || event.end.date;
            const startDate = new Date(start);
            const endDate = end ? new Date(end) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours
            
            const startStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            const endStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            
            const title = encodeURIComponent(event.summary || 'QCFI Event');
            const details = encodeURIComponent(event.description || '');
            const location = encodeURIComponent(event.location || 'Bengaluru');
            
            return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startStr}/${endStr}&text=${title}&details=${details}&location=${location}`;
        } catch (e) {
            return 'https://calendar.google.com/calendar';
        }
    }
    
    // ===== DISPLAY FUNCTIONS =====
    function showLoadingState() {
        if (eventsGrid) eventsGrid.innerHTML = '';
        if (loadingState) loadingState.style.display = 'block';
        if (noEventsState) noEventsState.style.display = 'none';
        
        if (pastEventsLoading) pastEventsLoading.style.display = 'block';
        if (noPastEvents) noPastEvents.style.display = 'none';
        if (pastEventsGrid) pastEventsGrid.innerHTML = '';
    }
    
    function showNoEventsState() {
        if (loadingState) loadingState.style.display = 'none';
        if (noEventsState) noEventsState.style.display = 'block';
        
        if (pastEventsLoading) pastEventsLoading.style.display = 'none';
        if (noPastEvents) noPastEvents.style.display = 'block';
    }
    
    function displayUpcomingEvents(events) {
    if (loadingState) loadingState.style.display = 'none';
    if (noEventsState) noEventsState.style.display = 'none';
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        showNoEventsState();
        return;
    }
    
    console.log(`Displaying ${events.length} upcoming events`);
    
    // Group events by month
    const eventsByMonth = {};
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    events.forEach(event => {
        const monthYear = `${monthNames[event.rawDate.getMonth()]} ${event.rawDate.getFullYear()}`;
        if (!eventsByMonth[monthYear]) {
            eventsByMonth[monthYear] = [];
        }
        eventsByMonth[monthYear].push(event);
    });
    
    // Sort months chronologically
    const sortedMonths = Object.keys(eventsByMonth).sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);
        return dateA - dateB;
    });
    
    // Display events with month separators
    let eventIndex = 0;
    sortedMonths.forEach((monthYear, monthIndex) => {
        // Add month separator
        const monthSeparator = document.createElement('div');
        monthSeparator.className = 'month-separator';
        monthSeparator.setAttribute('data-aos', 'fade-up');
        monthSeparator.innerHTML = `
            <div class="month-separator-line"></div>
            <div class="month-separator-text">${monthYear}</div>
            <div class="month-separator-line"></div>
        `;
        eventsGrid.appendChild(monthSeparator);
        
        // Add events for this month
        eventsByMonth[monthYear].forEach(event => {
            const eventCard = createEventCard(event, eventIndex);
            eventsGrid.appendChild(eventCard);
            eventIndex++;
        });
    });
    
    // Refresh animations
    if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 100);
    }
}
    
    function createEventCard(event, index) {
        const card = document.createElement('div');
        card.className = 'event-card-modern';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
        
        // Truncate description
        const description = event.description.length > 150 
            ? event.description.substring(0, 150) + '...' 
            : event.description;
        
        // Determine if it's a past event
        const isPast = event.isPast;
        const pastClass = isPast ? 'past-event' : '';
        const pastBadge = isPast ? '<span class="event-tag past-badge"><i class="fas fa-history"></i> Past Event</span>' : '';
        
        card.innerHTML = `
            <div class="event-header ${pastClass}">
                <div class="event-date">
                    <div class="day">${event.date.day}</div>
                    <div class="month">${event.date.month}</div>
                </div>
                <div class="event-title">
                    <h3>${event.title}</h3>
                    <div class="time-location">
                        <span><i class="far fa-clock"></i> ${event.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    </div>
                </div>
            </div>
            
            <div class="event-content">
                <div class="event-description">
                    ${description}
                </div>
                
                <div class="event-features">
                    ${pastBadge}
                    <span class="event-tag">${event.type}</span>
                    <span class="event-tag"><i class="far fa-calendar"></i> ${event.date.fullDate}</span>
                </div>
                
                <div class="event-actions">
                    <a href="${event.calendarLink}" target="_blank" class="add-calendar-btn">
                        <i class="far fa-calendar-plus"></i> Add to Calendar
                    </a>
                    ${isPast ? '' : '<a href="BangaloreChapter/contact.html" class="register-btn"><i class="fas fa-user-plus"></i> Register Now</a>'}
                </div>
            </div>
        `;
        
        return card;
    }
    
    function displayPastEvents(pastEvents) {
        if (!pastEventsGrid || !pastEventsLoading || !noPastEvents) return;
        
        pastEventsLoading.style.display = 'none';
        noPastEvents.style.display = 'none';
        pastEventsGrid.innerHTML = '';
        
        // Sort by date (most recent first)
        pastEvents.sort((a, b) => b.rawDate - a.rawDate);
        
        // Take most recent 6 past events
        const recentPastEvents = pastEvents.slice(0, 6);
        
        if (recentPastEvents.length === 0) {
            noPastEvents.style.display = 'block';
            return;
        }
        
        console.log(`Displaying ${recentPastEvents.length} past events`);
        
        recentPastEvents.forEach((event, index) => {
            const pastEventCard = createPastEventCard(event, index);
            pastEventsGrid.appendChild(pastEventCard);
        });
        
        // Refresh animations
        if (typeof AOS !== 'undefined') {
            setTimeout(() => AOS.refresh(), 100);
        }
    }
    
    function createPastEventCard(event, index) {
        const card = document.createElement('div');
        card.className = 'past-event-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
        
        // Format date nicely
        const formattedDate = event.rawDate.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Truncate description
        const description = event.description.length > 120 
            ? event.description.substring(0, 120) + '...' 
            : event.description;
        
        card.innerHTML = `
            <div class="past-event-header">
                <div class="past-event-date">${formattedDate}</div>
                <span class="past-event-type">${event.type}</span>
            </div>
            
            <h4>${event.title}</h4>
            <div class="past-event-description">${description}</div>
            
            <div class="past-event-meta">
                <div class="past-event-meta-item">
                    <i class="far fa-clock"></i>
                    <span>${event.time}</span>
                </div>
                <div class="past-event-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Debug logging
    console.log('Calendar integration initialized');
    console.log('Configuration loaded:', {
        calendarId: CONFIG.CALENDAR_ID,
        apiKeyLength: CONFIG.API_KEY.length,
        maxEvents: CONFIG.MAX_EVENTS
    });
});