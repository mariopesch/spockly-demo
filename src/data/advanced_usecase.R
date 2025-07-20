# Clear workspace
rm(list = ls())

# Load required libraries
library(sf)        # for handling spatial data
library(sp)        # for converting to Spatial* objects
library(gstat)     # for interpolation methods like IDW or Kriging
library(ggplot2)   # for visualizing data
library(dplyr)     # for data manipulation
library(leaflet)   # for interactive maps

# Step 1: Load CSV and convert to spatial object
df <- read.csv("beispiel_abfall_schulhof.csv")  # contains columns: lon, lat, abfall_art, abfall_menge
sf_points <- st_as_sf(df, coords = c("lon", "lat"), crs = 4326)  # convert to sf object with geographic coordinates

# Step 2: Inspect structure and content of the dataset
str(df)              # view data types and structure
summary(df)          # statistical summary of all variables
table(df$abfall_art) # count observations by litter type

# Step 3: Visualize litter locations and types using ggplot2
ggplot(sf_points) +
  geom_sf(aes(color = abfall_art, size = abfall_menge), alpha = 0.7) +
  theme_minimal() +
  labs(title = "Observed Litter on the Schoolyard",
       color = "Litter Type", size = "Quantity")

# Step 4: Calculate summary statistics

# Overall mean of litter quantity
mean(df$abfall_menge)

# Mean and maximum quantity per litter type
df %>%
  group_by(abfall_art) %>%
  summarise(
    mean_menge = mean(abfall_menge),
    max_menge = max(abfall_menge),
    .groups = "drop"
  )

# Step 5: Visualize data distributions

# Histogram of litter quantities
ggplot(df, aes(x = abfall_menge)) +
  geom_histogram(binwidth = 1, fill = "darkorange", color = "white") +
  theme_minimal() +
  labs(title = "Distribution of Litter Quantities", x = "Litter Amount", y = "Frequency")

# Bar chart: number of observations per litter type
ggplot(df, aes(x = abfall_art)) +
  geom_bar(fill = "steelblue") +
  theme_minimal() +
  labs(title = "Number of Observations per Litter Type", x = "Litter Type", y = "Count")

# Step 6: Create an interactive map with leaflet
leaflet(data = df) %>%
  addTiles() %>%
  addCircleMarkers(
    lng = ~lon,
    lat = ~lat,
    radius = ~abfall_menge * 2,  # scale circle size by amount
    color = ~case_when(          # color based on litter type
      abfall_art == "Plastik" ~ "red",
      abfall_art == "Papier"  ~ "blue",
      abfall_art == "Bio"     ~ "green",
      abfall_art == "Glas"    ~ "purple",
      TRUE                    ~ "gray"
    ),
    popup = ~paste("Type:", abfall_art, "<br>Amount:", abfall_menge),
    fillOpacity = 0.7
  ) %>%
  setView(lng = mean(df$lon), lat = mean(df$lat), zoom = 18)

# Step 7: Fit a simple linear model: Does litter amount depend on type?
model <- lm(abfall_menge ~ abfall_art, data = df)
summary(model)

# Step 8: Visualize model results with boxplot and scatter overlay
ggplot(df, aes(x = abfall_art, y = abfall_menge)) +
  geom_boxplot(fill = "lightblue") +
  geom_jitter(width = 0.2, alpha = 0.5) +
  theme_minimal() +
  labs(title = "Litter Quantity per Type", x = "Litter Type", y = "Amount")

# Step 9: Identify litter hotspots using rasterized counts
library(raster)

# Transform to projected CRS for distance and grid work
sf_proj <- st_transform(sf_points, crs = 25832)

# Rasterize litter counts onto a grid (count per cell)
r <- raster(extent(sf_proj), res = 5)  # 5 meter grid
raster_menge <- rasterize(sf_proj, r, field = "abfall_menge", fun = sum, background = 0)

# Plot: Litter intensity (Hotspots)
plot(raster_menge, main = "Litter Hotspots (Summed Amounts per Cell)")

# Step 10: Does distance to trash bins influence litter amount?

# Load trash bin locations
bins <- read.csv("muelltonnen.csv")
sf_bins <- st_as_sf(bins, coords = c("lon", "lat"), crs = 4326) %>%
  st_transform(crs = 25832)

# Calculate distance to nearest bin
distances <- st_distance(sf_proj, sf_bins)
df$dist_to_bin <- apply(distances, 1, min)

# Linear model: does litter increase with distance?
model_dist <- lm(abfall_menge ~ dist_to_bin, data = df)
summary(model_dist)

# Visualize relationship between distance and litter amount
ggplot(df, aes(x = dist_to_bin, y = abfall_menge)) +
  geom_point(alpha = 0.6, color = "darkblue") +
  geom_smooth(method = "lm", se = TRUE, color = "red") +
  theme_minimal() +
  labs(
    title = "Litter Amount vs. Distance to Nearest Bin",
    x = "Distance to Nearest Bin (meters)",
    y = "Litter Amount"
  )

# Step 11: Interpolate litter amounts across unsampled areas

# Convert sf to Spatial for gstat
coordinates(df) <- ~lon+lat

proj4string(df) <- CRS("+init=epsg:4326")
df_proj <- spTransform(df, CRS("+init=epsg:25832"))

# Create gstat object for Kriging
krig_model <- gstat(formula = abfall_menge ~ 1, data = df_proj)

# Create grid for prediction
x_range <- range(df_proj@coords[,1])
y_range <- range(df_proj@coords[,2])
grd <- expand.grid(x = seq(x_range[1], x_range[2], by = 5),
                   y = seq(y_range[1], y_range[2], by = 5))
coordinates(grd) <- ~x+y
gridded(grd) <- TRUE
proj4string(grd) <- CRS("+init=epsg:25832")

# Perform kriging
krig_result <- predict(krig_model, grd)
spplot(krig_result["var1.pred"], main = "Estimated Litter Distribution (Kriging)")

