package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BrandDTO {
  @NotBlank(message = "Brand name is required")
  private String name;
  @NotBlank(message = "Brand picture is required")
  private String pic;
  @NotBlank(message = "Brand active status is required")
  private boolean active;
}
