import { useSearchParams, useNavigate } from "react-router-dom";
import "./MyPage.css";
import { useState } from "react";
import { useStore } from "../hooks/useStore.js";
import Button from "../components/common/Button.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import SecondaryActionButton from "../components/common/SecondaryActionButton.jsx";

function MyPage() {
  const {
    profile,
    paymentMethod,
    orders,
    updateProfile,
    updatePaymentMethod,
  } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryTab = searchParams.get("tab");
  const activeTab = ["profile", "payment", "orders"].includes(queryTab)
    ? queryTab
    : "profile";
  const userProfile = {
    name: profile.name || "미등록",
    phone: profile.phone || "미등록",
    address: profile.address || "미등록",
  };
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const selectedPayment = paymentMethod;

  function handleTabChange(tabId) {
    setSearchParams({ tab: tabId });
  }

  const MY_PAGE_TABS = [
    { id: "profile", name: "개인정보" },
    { id: "payment", name: "결제수단" },
    { id: "orders", name: "주문내역" },
  ];

  const PAYMENT_METHODS = [
    {
      id: "card",
      name: "신용/체크카드",
      description: "가상 등록 카드 · 실제 카드정보는 저장하지 않습니다.",
    },
    {
      id: "easyPay",
      name: "간편결제",
      description: "프로토타입 표시용 간편결제",
    },
    {
      id: "onsite",
      name: "현장결제",
      description: "매장 또는 드라이브스루에서 결제",
    },
  ];

  function handleStartEdit() {
    setFormValues({
      name: userProfile.name === "미등록" ? "" : userProfile.name,
      phone: userProfile.phone === "미등록" ? "" : userProfile.phone,
      address: userProfile.address === "미등록" ? "" : userProfile.address,
    });
    setIsEditing(true);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    if (updateProfile(formValues)) {
      setIsEditing(false);
    }
  }

  function handleCancelEdit() {
    setFormValues({
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
    });
    setIsEditing(false);
  }

  function handlePaymentChange(id) {
    updatePaymentMethod(id);
  }
  function isName() {
    if (formValues.name.trim() !== "") return true;
    else return false;
  }
  function isPhone() {
    const phoneRegex = /^[0-9-]+$/;
    if (formValues.phone.trim() !== "" && phoneRegex.test(formValues.phone))
      return true;
    else return false;
  }

  function isAddress() {
    if (formValues.address.trim() !== "") return true;
    else return false;
  }

  function renderProfile() {
    return (
      <section className="my-page__panel" aria-labelledby="profile-title">
        <div className="my-page__panel-heading">
          <div>
            <p>Profile</p>
            <h2 id="profile-title">개인 정보</h2>
          </div>
          {!isEditing && (
            <button
              type="button"
              className="button button--secondary"
              onClick={handleStartEdit}
            >
              수정
            </button>
          )}
        </div>
        {!isEditing ? (
          // 조회 모드
          <>
            <dl className="profile-summary">
              <div>
                <dt>이름</dt>
                <dd>{userProfile.name}</dd>
              </div>
              <div>
                <dt>전화번호</dt>
                <dd>{userProfile.phone}</dd>
              </div>
              <div>
                <dt>주소</dt>
                <dd>{userProfile.address}</dd>
              </div>
            </dl>
          </>
        ) : (
          <form className="profile-form" onSubmit={handleSave}>
            <label>
              이름
              <small
                style={{
                  color: "red",
                }}
              >
                {isName() ? "" : "이름이 입력되지 않았습니다"}
              </small>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              전화번호
              <small
                style={{
                  color: "red",
                }}
              >
                {isPhone() ? "" : "잘못된 전화번호 입니다"}
              </small>
              <input
                type="text"
                name="phone"
                placeholder="010-0000-0000"
                value={formValues.phone}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              주소
              <small
                style={{
                  color: "red",
                }}
              >
                {isAddress() ? "" : "주소가 입력되지 않았습니다"}
              </small>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="profile-form__actions">
              <SecondaryActionButton
                className="profile-form__cancel"
                onClick={handleCancelEdit}
              >
                취소
              </SecondaryActionButton>
              <button
                type="submit"
                className="button button--primary"
                style={{
                  background: "var(--color-mcdonalds-yellow)",
                  fontWeight: "bold",
                  border: "0",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                disabled={isName() && isPhone() && isAddress() ? false : true}
              >
                저장
              </button>
            </div>
            <p className="my-page__privacy-note">
              입력한 정보는 서버로 전송되지 않고 현재 브라우저의
              localStorage에만 저장됩니다.
            </p>
          </form>
        )}
      </section>
    );
  }

  function renderPayment() {
    return (
      <section className="my-page__panel">
        <div className="my-page__panel-heading">
          <div>
            <p>Payment</p>
            <h2 id="payment-title">결제수단</h2>
          </div>
        </div>
        <div className="payment-methods">
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedPayment === method.id;
            return (
              <label
                key={method.id}
                className={isSelected ? "is-selected" : ""}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={isSelected}
                  onChange={() => handlePaymentChange(method.id)}
                />
                <span>
                  <strong>{method.name}</strong>
                  <small>{method.description}</small>
                </span>
              </label>
            );
          })}
        </div>
        <p className="my-page__privacy-note">
          실제 카드번호·CVC·금융정보는 입력하거나 저장하지 않습니다.
        </p>
      </section>
    );
  }

  function renderOrders() {
    return (
      <section className="my-page__panel">
        <div className="my-page__panel-heading">
          <div>
            <p>Orders</p>
            <h2 id="orders-title">주문내역</h2>
          </div>
        </div>
        {orders.length === 0 ? (
          <EmptyState
            title="주문내역이 없습니다."
            description="아직 주문한 메뉴가 없습니다. 메뉴를 둘러보고 첫 주문을 시작해보세요."
            action={
              <Button
                className="order-empty__cta"
                size="medium"
                onClick={() => navigate("/menus")}
              >
                메뉴 보기
              </Button>
            }
          />
        ) : (
          <div className="my-page__orders">
            {orders.map((order) => {
              // 데이터 정의서 기준 channel("delivery") 여부 확인
              const isDelivery = order.channel === "delivery";
              // serviceType 한글 표기 변환 (delivery: 배달, takeout: 포장, dineIn: 매장식사)
              const serviceTypeLabel =
                order.serviceType === "delivery"
                  ? "배달"
                  : order.serviceType === "takeout"
                    ? "포장"
                    : "매장식사";

              return (
                <article key={order.orderId} className="order-card">
                  <header>
                    <span>{order.status}</span>
                    <time>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : order.date}
                    </time>
                  </header>

                  <div className="order-card__meta">
                    <span>주문 번호 {order.orderNumber || order.orderId}</span>
                    <span>주문 방식: {serviceTypeLabel}</span>
                    {/* 데이터 정의서 기준: store 채널일 때만 주문 지점(branchName) 표기 */}
                    {!isDelivery && order.branchName && (
                      <span>주문 지점: {order.branchName}</span>
                    )}
                  </div>

                  <div
                    style={{
                      background: "#f8f9fa",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      margin: "16px 0",
                      fontSize: "0.9rem",
                    }}
                  >
                    <div style={{ display: "flex", marginBottom: "6px" }}>
                      <span
                        style={{
                          width: "110px",
                          fontWeight: "600",
                          borderLeft:
                            "3px solid var(--color-mcdonalds-yellow, #ffbc0d)",
                          paddingLeft: "8px",
                        }}
                      >
                        {isDelivery ? "배달 요청사항" : "매장 요청사항"}
                      </span>
                      <span style={{ color: "#555" }}>
                        {order.request || "없음"}
                      </span>
                    </div>
                    {order.serviceType !== "dineIn" && (
                    <div style={{ display: "flex" }}>
                      <span
                        style={{
                          width: "110px",
                          fontWeight: "600",
                          borderLeft:
                            "3px solid var(--color-mcdonalds-yellow, #ffbc0d)",
                          paddingLeft: "8px",
                        }}
                      >
                        일회용품
                      </span>
                      <span style={{ color: "#555" }}>
                        {(order.disposableNeeded ?? order.disposable)
                          ? "필요함"
                          : "필요하지 않음"}
                      </span>
                    </div>
                    )}
                  </div>

                  <ul>
                    {order.items.map((item, idx) => {
                      // CartItem 정의의 optionSummary 배열을 보기 좋게 조합
                      const optionText = item.optionSummary
                        ? item.optionSummary.join(" / ")
                        : item.option || "";

                      return (
                        <li key={item.cartItemId || idx}>
                          <div>
                            <strong>
                              {item.name} × {item.quantity}
                            </strong>
                            <small>{optionText}</small>
                          </div>
                          <span
                            style={{ fontWeight: "600", whiteSpace: "nowrap" }}
                          >
                            {Number.isFinite(item.lineTotal ?? item.itemTotal)
                              ? `${(item.lineTotal ?? item.itemTotal).toLocaleString()}원`
                              : item.price}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <footer>
                    <strong>
                      총{" "}
                      {order.totalPrice
                        ? `${order.totalPrice.toLocaleString()}원`
                        : ""}
                    </strong>
                    <SecondaryActionButton
                      className="order-card__detail-button"
                      onClick={() =>
                        navigate(`/order-complete/${order.orderId}`)
                      }
                    >
                      상세 보기
                    </SecondaryActionButton>
                  </footer>
                </article>
              );
            })}
          </div>
        )}
      </section>
    );
  }

  return (
    <main className="flow-page my-page">
      <p className="flow-page__eyebrow">MyPage</p>
      <h1>마이페이지</h1>
      <nav className="my-page__tabs">
        {MY_PAGE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? "is-active" : ""}
            aria-current={activeTab === tab.id ? "page" : undefined}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </nav>
      {activeTab === "profile" && renderProfile()}
      {activeTab === "payment" && renderPayment()}
      {activeTab === "orders" && renderOrders()}
    </main>
  );
}
export default MyPage;
