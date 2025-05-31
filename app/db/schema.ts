import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const touristSpots = sqliteTable('tourist_spots', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(), // cultural, nature, hot_springs
  prefecture: text('prefecture').notNull(), // 都道府県名
  region: text('region').notNull(), // 地域名
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  duration: integer('duration').notNull(), // minutes
  ageGroup: text('age_group'), // child, adult, senior, all
  season: text('season'), // spring, summer, autumn, winter, all
  weatherPreference: text('weather_preference'), // indoor, outdoor, both
  popularity: integer('popularity').default(0),
});

export const weatherCache = sqliteTable('weather_cache', {
  id: integer('id').primaryKey(),
  date: text('date').notNull(),
  temperature: real('temperature'),
  humidity: integer('humidity'),
  weatherMain: text('weather_main'),
  description: text('description'),
  icon: text('icon'),
  windSpeed: real('wind_speed'),
  precipitation: real('precipitation'),
  cachedAt: text('cached_at').notNull(),
});

export const userPlans = sqliteTable('user_plans', {
  id: integer('id').primaryKey(),
  userId: text('user_id'),
  name: text('name').notNull(),
  duration: text('duration').notNull(), // 2hours, halfday, fullday, 1night2days, 2nights3days
  groupSize: integer('group_size').notNull(),
  ageGroup: text('age_group').notNull(),
  transportation: text('transportation').notNull(), // train, car, bus
  selectedSpots: text('selected_spots'), // JSON array of spot IDs
  schedule: text('schedule'), // JSON schedule data
  createdAt: text('created_at').notNull(),
});

export const spotReviews = sqliteTable('spot_reviews', {
  id: integer('id').primaryKey(),
  spotId: integer('spot_id').references(() => touristSpots.id),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  ageGroup: text('age_group'),
  visitDate: text('visit_date'),
  createdAt: text('created_at').notNull(),
});