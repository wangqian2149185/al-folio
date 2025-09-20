// assets/js/visit-counter.js
// Visitor counter for al-folio site using Counter.dev API

(async function() {
    // 1. The page identifier for the API. This MUST match what you registered on Counter.dev.
    // It is your full GitHub Pages URL without the "https://" part.
    const page = "wangqian2149185.github.io/qianwang.github.io";

    // 2. Get a reference to the HTML element we want to update
    const counterElement = document.getElementById("visit-counter");
    
    // If the element isn't found on the page, exit quietly.
    if (!counterElement) {
        console.warn("Visitor counter: Element #visit-counter not found on page.");
        return;
    }

    try {
        // 3. Fetch the data from the Counter.dev API
        const apiUrl = `https://counter.dev/api/count?page=${page}`;
        const response = await fetch(apiUrl);

        // 4. Check if the HTTP request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 5. Parse the JSON data from the response
        const data = await response.json();

        // 6. Check if the API returned a valid count number
        if (data && typeof data.count === 'number') {
            // 7. Format the number with commas (e.g., 12345 becomes 12,345)
            const formattedCount = data.count.toLocaleString();
            // 8. Update the page with the formatted count
            counterElement.textContent = formattedCount;
            
            // Optional: Log success for debugging
            console.log(`Visitor counter: Successfully updated to ${formattedCount}`);
            
        } else {
            // If the API response doesn't contain a valid count
            throw new Error("Invalid API response format. 'count' is missing or not a number.");
        }

    } catch (error) {
        // 9. Handle any errors that occurred during the fetch or processing
        
        // Optional: Set a fallback text if the fetch fails
        // counterElement.textContent = "many"; // (the placeholder is already "many")
        
        // Log the error for debugging, but don't break the user's experience
        console.error("Visitor counter: Could not fetch visit count.", error);
    }
})();