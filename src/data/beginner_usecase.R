# Load required libraries
library(sp)
library(gstat)
library(ggplot2)
library(sf)

# Load and prepare meuse dataset (zinc measurements and coordinates)
data(meuse)
coordinates(meuse) = ~x + y  # Convert to spatial object

# Load and prepare interpolation grid
data(meuse.grid)
coordinates(meuse.grid) = ~x + y
gridded(meuse.grid) = TRUE  # Define as spatial grid for interpolation

# Basic summary statistics of zinc values
summary(meuse$zinc)
mean_zinc <- mean(meuse$zinc, na.rm = TRUE)
sd_zinc <- sd(meuse$zinc, na.rm = TRUE)
cat("Mean zinc:", mean_zinc, "\n")
cat("SD zinc:", sd_zinc, "\n")

# Visualize measurement locations with background polygon (river)
data(meuse.riv)
meuse.sp = SpatialPolygons(list(Polygons(list(Polygon(meuse.riv)), "meuse.riv")))
meuse.lt = list("sp.polygons", meuse.sp, fill = "grey")
spplot(meuse, "zinc", key.space = "right", sp.layout = meuse.lt)

# IDW (Inverse Distance Weighting) interpolation of zinc values
idw_model <- gstat(id = "zinc", formula = zinc~1, data = meuse, set = list(idp = 2))
idw_result <- predict(idw_model, meuse.grid)

# Visualize the IDW interpolation result
spplot(idw_result["zinc.pred"], main = "IDW Interpolation of Zinc (p=2)")

# Plot histogram of zinc concentrations
hist(meuse$zinc, breaks = 20, main = "Histogram of Zinc Concentration", 
     xlab = "Zinc", col = "lightblue")

# Boxplot of zinc concentrations
boxplot(meuse$zinc, main = "Boxplot of Zinc Concentration", 
        ylab = "Zinc", col = "orange")

# Fit a linear trend model: zinc concentration as a function of coordinates
trend_model <- lm(zinc ~ x + y, data = meuse)
summary(trend_model)

