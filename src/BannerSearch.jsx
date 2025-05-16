import { createPortal } from "react-dom";

export default function BannerSearch() {
  const bannerSearchElement = document.querySelector(
    '[class^="NodeHeader"] [class^="SearchField_lia-input-group"]',
  );

  if (!bannerSearchElement || !bannerSearchElement.parentElement) {
    return;
  }

  // This assumes CSS had been added to the page to set the visibility to hidden
  // to initially hide the element but retain the space.
  bannerSearchElement.style.display = 'none';

  return createPortal(
    <div
      role="region"
      aria-live="polite"
      className="SearchField_lia-input-group__AjHkp SearchField_lia-input-group-lg__U0z8L BannerSearch_lia-embedded-search-wrapper__kDv4e styles_input-group__9JmKA styles_input-group-lg__k_Imv"
    >
      <div className="SearchField_lia-input-group-prepend__zocR1 SearchField_lia-input-group-prepend-lg__HyVtQ styles_input-group-prepend__cmSLp">
        <svg
          className="styles_lia-g-icon-size-20__oBHJy Icon_lia-size-20__qVZab Icon_lia-icon__on1Gb"
          data-testid="Icon"
          aria-hidden="true"
          style={{
            "--lia-local-icon-color":
              "var(--lia-bs-gray-700); --lia-local-icon-color-h: var(--lia-bs-gray-700-h);",
            "--lia-local-icon-color-s":
              "var(--lia-bs-gray-700-s); --lia-local-icon-color-l: var(--lia-bs-gray-700-l)",
          }}
        >
          <use href="/static/graphics/processed/6933f3cf/search.svg#search"></use>
        </svg>
      </div>
      <input
        name="search"
        autoComplete="off"
        placeholder="Custom Search the community"
        data-testid="SearchField.search"
        type="text"
        className="SearchField_lia-input-field__9jyNS SearchField_lia-input-field-lg__h_Ic5 styles_form-control__h8E13"
        value=""
      />
    </div>,
    bannerSearchElement.parentElement,
  );
}
