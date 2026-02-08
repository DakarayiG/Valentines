<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Valentines.WebForm1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /* Add hearts container style */
        #heartsContainer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        }
        
        .heart {
            position: absolute;
            pointer-events: none;
            opacity: 0.7;
            animation: float 15s infinite linear;
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .message {
            display: none; /* Keep message hidden initially */
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Add hearts container -->
    <div id="heartsContainer" class="hearts-container"></div>
    
    <!-- Background Music -->
    <audio id="backgroundMusic" loop autoplay>
        <source src="Audio/valentine-music.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    
    <h1>Will you be my Valentine?</h1>
    
    <div class="bear-container">
        <div class="bear">
            <span class="bear-emoji">🧸</span>
        </div>
    </div>
    
    <div class="buttons-container" id="buttonsContainer">
        <button class="btn" id="yesBtn">Yes</button>
        <!-- No button will be created by JavaScript -->
    </div>
    
    <div class="message" id="message">
        Thank you!😊❤️
    </div>
    
    <div class="footer">
        <span class="heart-icon">❤️</span> Made with ❤️😊
    </div>
    
    <!-- DEBUG SCRIPT - Add this to see what's happening -->
    <script>
        console.log("=== AUDIO DEBUGGING ===");

        document.addEventListener('DOMContentLoaded', function () {
            console.log("1. DOM Loaded");

            const bgMusic = document.getElementById('backgroundMusic');
            if (!bgMusic) {
                console.error("❌ ERROR: backgroundMusic element not found!");
                return;
            }

            console.log("2. Audio element found");
            console.log("3. Audio source:", bgMusic.querySelector('source').src);

            // Set volume
            bgMusic.volume = 0.3;
            console.log("4. Volume set to 0.3");

            // Check audio file accessibility
            const audioSrc = bgMusic.querySelector('source').src;
            console.log("5. Testing file accessibility...");

            fetch(audioSrc)
                .then(response => {
                    if (response.ok) {
                        console.log("✅ File is accessible (HTTP Status:", response.status + ")");
                    } else {
                        console.error("❌ File not found (HTTP Status:", response.status + ")");
                        console.log("   Expected path: ", audioSrc);
                    }
                })
                .catch(error => {
                    console.error("❌ Error accessing file:", error);
                });

            // Try to play
            console.log("6. Attempting to play...");
            bgMusic.play().then(() => {
                console.log("✅ SUCCESS: Music is playing!");
                console.log("   Duration:", bgMusic.duration, "seconds");
                console.log("   Current time:", bgMusic.currentTime);
            }).catch(error => {
                console.error("❌ FAILED to play:", error.name);
                console.log("   Error message:", error.message);

                if (error.name === "NotAllowedError") {
                    console.log("   ⚠️ This is an autoplay restriction");
                    console.log("   💡 Click anywhere on the page to start music");
                }

                // Setup click handler
                document.addEventListener('click', function startMusic() {
                    console.log("7. User clicked, trying to play...");
                    bgMusic.play().then(() => {
                        console.log("✅ Music started after click!");
                    }).catch(clickError => {
                        console.error("❌ Still failed after click:", clickError);
                    });
                    document.removeEventListener('click', startMusic);
                }, { once: true });
            });

            // Add event listeners to track audio state
            bgMusic.addEventListener('playing', () => console.log("🎵 Audio is now playing"));
            bgMusic.addEventListener('pause', () => console.log("⏸️ Audio paused"));
            bgMusic.addEventListener('error', (e) => console.error("🔥 Audio error:", e));
        });

        // Add this to see if there are any console errors
        window.addEventListener('error', function (e) {
            console.error("Global error:", e.message, "at", e.filename, ":", e.lineno);
        });
    </script>
</asp:Content>