// CafeCard.tsx

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface Props {
  cafe_name: string;
  adress: string;
  rating: string | number;
  desc: string;
  promotion: string;
  image: any;
  ratings: any;
  onPress?: () => void;
}

export default function CafeCard({
  cafe_name,
  adress,
  rating,
  desc,
  promotion,
  image,
  ratings,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.topRow}>
        <View style={styles.leftSide}>
          <Image source={{ uri: image }} style={styles.image} />

          <View style={styles.info}>
            <Text style={styles.name}>{cafe_name}</Text>

            <Text style={styles.address}>{adress}</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {rating}</Text>
          <Text style={styles.reviewText}>{ratings} reviews</Text>
        </View>
      </View>

      <Text style={styles.description}>{desc}</Text>

      <View style={styles.promoBox}>
        <Text style={styles.promoText}>🎁 {promotion}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 24,
    padding: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  leftSide: {
    flexDirection: "row",
    flex: 1,
  },

  image: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
  },

  info: {
    marginLeft: 12,
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  address: {
    marginTop: 4,
    fontSize: 13,
    color: "#6b7280",
  },

  ratingContainer: {
    alignItems: "flex-end",
  },

  rating: {
    fontWeight: "700",
    color: "#f59e0b",
    fontSize: 15,
  },

  reviewText: {
    marginTop: 2,
    color: "#9ca3af",
    fontSize: 12,
  },

  description: {
    marginTop: 16,
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 20,
  },

  promoBox: {
    marginTop: 18,
    backgroundColor: "#dcfce7",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
  },

  promoText: {
    color: "#16a34a",
    fontWeight: "600",
    fontSize: 14,
  },
});