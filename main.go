package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file (optional)
	godotenv.Load()

	// Get the PORT from .env or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Set up the router
	router := chi.NewRouter()

	// Enable CORS
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// Homepage at "/"
	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./assets/index.html")
	})

	router.Handle("/assets/*", http.StripPrefix("/assets/", http.FileServer(http.Dir("./assets"))))

	// Serve math game files from /math/
	fs := http.StripPrefix("/math/", http.FileServer(http.Dir("./math")))
	router.Handle("/math/*", fs)

	// Start the server
	log.Printf("Server running on port %s", port)
	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		log.Fatal("Server failed:", err)
	}
}
