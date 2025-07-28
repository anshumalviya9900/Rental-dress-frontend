import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../Config"; 

const baseUrl = config.BASE_URL;
const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [reviewImageFile, setReviewImageFile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/products/product/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        if (Array.isArray(data.product?.image) && data.product.image.length > 0) {
          setMainImage(data.product.image[0].replace(/\\/g, "/"));
        }
      })
      .catch((err) => console.error(err));

    fetch(`${baseUrl}/review/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch((err) => console.error(err));

    fetch(`${baseUrl}/review/is-eligible/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCanReview(data.eligible))
      .catch((err) => console.error("Eligibility check failed", err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product?._id || product._id.length !== 24) return;
    try {
      setAddingToCart(true);
      const res = await fetch(`${baseUrl}/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });
      const data = await res.json();
      if (res.ok) toast.success(" Product added to cart successfully!");
      else if (res.status === 401) navigate("/sign-in");
      else toast.error(" " + (data?.error || "Something went wrong"));
    } catch (error) {
      toast.error(" " + error.message);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleReviewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submitReview = async () => {
    if (!reviewText || !rating) return;
    try {
      const formData = new FormData();
      formData.append("productId", id);
      formData.append("rating", rating);
      formData.append("reviewText", reviewText);
      if (reviewImageFile) formData.append("reviewImage", reviewImageFile);

      const res = await fetch(`${baseUrl}/review/add`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(" Review submitted successfully!");
        setReviewText("");
        setRating(0);
        setImagePreview(null);
        setReviewImageFile(null);
        setReviews([data.review, ...reviews]);
      } else {
        toast.error(" " + (data?.error || "Review submission failed"));
      }
    } catch (err) {
      toast.error(" Error: " + err.message);
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={styles.pageContainer}>
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "10px 20px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              fontSize: "14px",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginLeft: "-150px",
              marginTop: "-20px",
            }}
          >
            ← Back
          </button>
        </div>

        <div style={styles.cartContainer}>
          <div style={styles.leftImage}>
            <div style={styles.thumbnailContainer}>
              {product?.image?.map((img, i) => (
                <img
                  key={i}
                  src={`${baseUrl}/${img.replace(/\\/g, "/")}`}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img.replace(/\\/g, "/"))}
                  style={{
                    ...styles.thumb,
                    border:
                      mainImage === img.replace(/\\/g, "/")
                        ? "2px solid #c2185b"
                        : "1px solid #ccc",
                  }}
                />
              ))}
            </div>
            <img src={`${baseUrl}/${mainImage}`} alt="main" style={styles.mainImage} />
          </div>

          <div style={styles.rightDetail}>
            <h2>{product?.name}</h2>
            <p><strong>Rental:</strong> ₹{product?.rentalPrice || 3360} for 4 days</p>
            <p><strong>Retail:</strong> ₹{product?.retailPrice || 12500}</p>
            <p><strong>Security:</strong> ₹{product?.securityAmount || 3000} (Refundable)</p>
            <p><strong>Size:</strong> <button style={styles.sizeBtn}>S,M,L</button></p>
            {product?.description && (
              <p style={{ whiteSpace: "pre-wrap" }}>
                <strong>Product Info:</strong><br />
                {product.description}
              </p>
            )}
            <div style={{ display: "flex", gap: "15px" }}>
              <br />
              <button
                onClick={handleAddToCart}
                style={{
                  ...styles.cartBtn,
                  cursor: addingToCart ? "wait" : "pointer",
                  backgroundColor: addingToCart ? "#999" : styles.cartBtn.backgroundColor,
                }}
                disabled={addingToCart}
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {canReview ? (
          <div style={{ maxWidth: "900px", margin: "40px auto", background: "#fff", borderRadius: "12px", padding: "30px", color: "#802121" }}>
            <h3>ADD A REVIEW</h3>
            <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "28px",
                    cursor: "pointer",
                    color: (hover || rating) >= star ? "gold" : "#ccc",
                  }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Your review"
              maxLength={600}
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "6px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            ></textarea>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <div style={{ color: "gray" }}>{reviewText.length}/600</div>
            </div>
            <button
              onClick={submitReview}
              style={{
                marginTop: "20px",
                padding: "10px 30px",
                borderRadius: "6px",
                backgroundColor: reviewText && rating ? "#802121" : "#ccc",
                color: "white",
                border: "none",
                cursor: reviewText && rating ? "pointer" : "not-allowed",
              }}
              disabled={!reviewText || !rating}
            >
              Submit
            </button>
          </div>
        ) : (
          <div style={{ maxWidth: "900px", margin: "40px auto", background: "#fff", borderRadius: "12px", padding: "30px", color: "#802121" }}>
            <h3>ADD A REVIEW</h3>
            <p style={{ color: "gray" }}>Only customers who have ordered this product can leave a review.</p>
          </div>
        )}

        <div style={{ maxWidth: "900px", margin: "20px auto", background: "#fff", borderRadius: "12px", padding: "30px", color: "#802121" }}>
          <h3>All Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((rev, i) => (
              <div key={i} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "15px" }}>
                <div style={{ fontSize: "20px", color: "#ffc107" }}>{"★".repeat(rev.rating)}</div>
                <p>{rev.reviewText}</p>
                {rev.image && (
                  <img
                    src={`baseUrl/${rev.image.replace(/\\/g, "/")}`}
                    alt="review"
                    style={{ height: "120px", borderRadius: "6px" }}
                  />
                )}
                <div style={{ fontSize: "12px", color: "gray" }}>{new Date(rev.createdAt).toLocaleDateString()}</div>
              </div>
            ))
          ) : (
            <p>No reviews yet for this product.</p>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  pageContainer: {
    background: "linear-gradient(to right, #fff8f8,rgba(20, 25, 95, 0.25))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    padding: "40px 60px",
    marginTop: "-40px",
  },
  cartContainer: {
    display: "flex",
    padding: "30px",
    borderRadius: "20px",
    gap: "40px",
    width: "1100px",
    marginLeft: "160px",
  },
  leftImage: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  },
  thumbnailContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  thumb: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer",
  },
  mainImage: {
    height: "580px",
    borderRadius: "16px",
    objectFit: "cover",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  rightDetail: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sizeBtn: {
    marginLeft: "10px",
    padding: "6px 14px",
    border: "1px solid #802121",
    borderRadius: "5px",
    background: "#fff",
    color: "#802121",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cartBtn: {
    padding: "12px 28px",
    backgroundColor: "#3f9142",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
  },
};

export default Product;
